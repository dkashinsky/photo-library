
const { Sequelize, DataTypes } = require('sequelize');
const folderInitializer = require('./folder');
const fileInitializer = require('./file');

const sequelize = new Sequelize('sqlite::memory:');

const Folder = folderInitializer(sequelize, DataTypes);
const File = fileInitializer(sequelize, DataTypes);

Folder.hasMany(File, { foreignKey: 'folderId' });

sequelize.sync();

module.exports = {
  Folder,
  File,
};
