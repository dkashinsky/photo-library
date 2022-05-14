
import { sequelize } from './sequelize';
import { Folder } from './models/folder';
import { File } from './models/file';
import { FaceArea } from './models/face-area';
import { Person } from './models/person';
import { PersonDescriptorRef } from './models/person-descriptor-ref';

export const initDB = async () => {
  return await sequelize.sync();
};

export {
  File,
  Folder,
  FaceArea,
  Person,
  PersonDescriptorRef,
};
