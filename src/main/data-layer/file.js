module.exports = (sequelize, DataTypes) => {
  return sequelize.define('File', {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, { timestamps: false });
};
