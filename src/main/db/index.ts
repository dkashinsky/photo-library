
import { sequelize } from './sequelize';
import { Folder } from './models/folder';
import { File } from './models/file';

//Folder.hasMany(File, { foreignKey: 'folderId' });

export const initDB = async () => {
  return await sequelize.sync();
};

export {
  File,
  Folder,
};
