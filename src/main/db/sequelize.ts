import { Sequelize } from 'sequelize-typescript'
import { FaceArea } from './models/face-area';
import { File } from './models/file';
import { Folder } from './models/folder';
import { Person } from './models/person';
import { PersonDescriptorRef } from './models/person-descriptor-ref';
import { config } from '../config';
import { join } from 'path';

const storage = config.useInMemoryStore
  ? ':memory:'
  : join(config.assetsPath, 'db/database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storage,
  models: [Folder, File, FaceArea, Person, PersonDescriptorRef],
});
