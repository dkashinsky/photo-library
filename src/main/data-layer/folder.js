
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Folder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isProcessed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, { timestamps: false });
};
