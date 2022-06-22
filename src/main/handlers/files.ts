import { Op } from 'sequelize';
import { FaceArea, File, PersonDescriptorRef } from '../db';
import { getFaceAreaDTO } from './face-areas';
import { detectFaces, matchFace, PersonMatcher } from '../face-api/detection';
import { groupBy } from './utils/group-by';
import { getPerson } from './people';
import { getIntervalThreshold, queryAgeInterval, updateIntervalThreshold } from '../kb/queries';

export type FilesRequest = {
  directoryId: string;
  startDate?: Date | null;
  endDate?: Date | null;
  peopleIds?: string[];
}

export type LinkPersonRequest = {
  faceAreaId: string;
  personId: string;
  asReference?: boolean;
}

const getFileInfoDTO = (file: File) => ({
  id: file.id,
  folderId: file.folderId,
  name: file.name,
  path: file.path,
  size: file.size,
  createDate: file.createDate,
  isProcessed: file.isProcessed,
});

const getFileInfoExtendedDTO = (file: File) => ({
  ...getFileInfoDTO(file),
  faceAreas: file.faceAreas.map(getFaceAreaDTO)
});

export const getFiles = async ({ directoryId, startDate, endDate, peopleIds }: FilesRequest) => {
  // Produce filter to reduce files whose create date is in the specified range.
  const dateFilter = startDate || endDate
    ? {
      createDate: {
        ...(startDate ? { [Op.gte]: startDate } : null),
        ...(endDate ? { [Op.lte]: endDate } : null),
      }
    }
    : null;

  // Produce inclusion so that when used, files will be reduced to those,
  // whose face areas satisfy specified people. Uses inner join under the hood.
  const includePeople = {
    model: FaceArea,
    where: {
      personId: peopleIds,
    },
    attributes: ['id'],
    required: true,
  };

  const files = await File.findAll({
    where: {
      folderId: directoryId,
      ...dateFilter,
    },
    include: peopleIds?.length
      ? includePeople
      : undefined,
    order: [['createDate', 'DESC']],
  });

  return files.map(getFileInfoDTO);
};

export const getFile = async (fileId: string) => {
  const file = await File.findByPk(fileId, {
    include: [FaceArea],
  });

  if (!file) {
    throw new Error('No File Found...');
  }

  return getFileInfoExtendedDTO(file);
};


export const processFile = async (fileId: string) => {
  const file = await File.findByPk(fileId, {
    include: [FaceArea],
  });

  if (!file) {
    throw new Error('No File Found...');
  }

  if (!file.isProcessed) {
    const faceDetections = await detectFaces(file.path);

    if (faceDetections.length) {
      const descriptorsByPersonId = await getDescriptorsByPersonId();
      const matcher = new PersonMatcher(descriptorsByPersonId);

      for (const { detection, descriptor, age } of faceDetections) {
        const { x, y, width, height } = detection.relativeBox;
        // get age category from KB
        const ageCategory = await queryAgeInterval(age) || 'N/A';
        // get age category recognition threshold from KB
        const threshold = await getIntervalThreshold(ageCategory);
        const match = matcher.matchDescriptor(descriptor, threshold);

        // narrow down threshold if recognition distance is better than previously specified
        if (ageCategory && match && (!threshold || match.distance < threshold)) {
          // update recognition threshold in the KB
          await updateIntervalThreshold(ageCategory, match.distance);
        }

        const personId = match?.personId;
        const faceArea = await FaceArea.create({
          fileId,
          x,
          y,
          width,
          height,
          descriptor,
          personId,
          age,
          ageCategory,
        });

        file.faceAreas.push(faceArea);
      }
    }

    file.isProcessed = true;
    await file.save();
  }

  return getFileInfoExtendedDTO(file);
};

const setFaceAreaPerson = async (faceAreaId: string, personId: string | null) => {
  await FaceArea.update(
    { personId: personId! },
    { where: { id: faceAreaId } });

  const faceArea = await FaceArea.findOne({
    where: { id: faceAreaId },
    rejectOnEmpty: true,
  });

  return await getFile(faceArea.fileId);
};

const setPersonReference = async (personId: string, faceAreaId: string) => {
  // TODO: upsert fails when personId and faceAreaId already exist alhough it should update
  // need to figure out why.
  // const ref = await PersonDescriptorRef.upsert({
  //   personId,
  //   faceAreaId,
  // });

  const refBody = { personId, faceAreaId };
  let ref = await PersonDescriptorRef.findOne({ where: refBody });
  if (!ref) {
    ref = await PersonDescriptorRef.create(refBody);
  }
};

export const linkFaceAreaToPerson = async (linkRequest: LinkPersonRequest) => {
  const { faceAreaId, personId, asReference } = linkRequest;

  if (asReference) {
    await setPersonReference(personId, faceAreaId);
  }

  return await setFaceAreaPerson(faceAreaId, personId);
};

export const unlinkFaceAreaFromPerson = async (faceAreaId: string) => {
  return await setFaceAreaPerson(faceAreaId, null);
};

export const getDescriptorsByPersonId = async () => {
  const descriptors = await PersonDescriptorRef.findAll({
    include: [FaceArea],
  });

  return groupBy(descriptors, 'personId', (item) => {
    return item.faceArea.descriptor;
  });
};

export const recognizeFaceArea = async (faceAreaId: string) => {
  const faceArea = await FaceArea.findByPk(faceAreaId, { rejectOnEmpty: true });
  const descriptorsByPersonId = await getDescriptorsByPersonId();
  const threshold = await getIntervalThreshold(faceArea.ageCategory);

  const match = matchFace(faceArea.descriptor, descriptorsByPersonId, threshold);

  return match
    ? await getPerson(match.personId)
    : null;
};
