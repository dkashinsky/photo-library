
const { Sequelize, DataTypes } = require('sequelize');
const { defineFolder } = require('./folder');

const sequelize = new Sequelize('sqlite::memory:');
const Folder = defineFolder(sequelize);

sequelize.sync();

module.exports = {
  Folder,
};
