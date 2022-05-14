import { FaceArea, File, PersonDescriptorRef } from '../db';
import { getFaceAreaDTO } from './face-areas';
import { detectFaces } from '../face-api/detection';

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

export const getFiles = async (folderId: string) => {
  const files = await File.findAll({
    where: { folderId },
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

    for (const { detection, descriptor } of faceDetections) {
      const { x, y, width, height } = detection.relativeBox;
      const faceArea = await FaceArea.create({
        fileId,
        x,
        y,
        width,
        height,
        descriptor: Array.from(descriptor)
      });

      file.faceAreas.push(faceArea);
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

export const linkFaceAreaToPerson = async (faceAreaId: string, personId: string, asReference?: boolean) => {
  if (asReference) {
    await setPersonReference(personId, faceAreaId);
  }

  return await setFaceAreaPerson(faceAreaId, personId);
};

export const unlinkFaceAreaFromPerson = async (faceAreaId: string) => {
  return await setFaceAreaPerson(faceAreaId, null);
};
