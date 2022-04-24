import { FaceArea } from '../db';

export const getFaceAreaDTO = (faceArea: FaceArea) => ({
  id: faceArea.id,
  x0: faceArea.x0,
  y0: faceArea.y0,
  x1: faceArea.x1,
  y1: faceArea.y1,
});

export const getFileFaces = async (fileId: string) => {
  const faceAreas = await FaceArea.findAll({
    where: { fileId },
  });

  return faceAreas.map(getFaceAreaDTO);
};
