import { Sequelize } from 'sequelize-typescript'
import { File } from './models/file';
import { Folder } from './models/folder';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [Folder, File],
});
