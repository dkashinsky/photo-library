import { FaceArea } from '../db';

export const getFaceAreaDTO = (faceArea: FaceArea) => ({
  id: faceArea.id,
  x: faceArea.x,
  y: faceArea.y,
  width: faceArea.width,
  height: faceArea.height,
  personId: faceArea.personId,
  age: faceArea.age,
});

export const getFileFaces = async (fileId: string) => {
  const faceAreas = await FaceArea.findAll({
    where: { fileId },
  });

  return faceAreas.map(getFaceAreaDTO);
};
