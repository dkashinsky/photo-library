const { Sequelize, DataTypes } = require('sequelize');

const defineFolder = (sequelize) => {
  return sequelize.define('Folder', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = {
  defineFolder,
};
