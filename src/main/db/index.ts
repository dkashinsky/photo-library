
import { sequelize } from './sequelize';
import { Folder } from './models/folder';
import { File } from './models/file';
import { FaceArea } from './models/face-area';
import { Person } from './models/person';

export const initDB = async () => {
  return await sequelize.sync();
};

export {
  File,
  Folder,
  FaceArea,
  Person,
};
