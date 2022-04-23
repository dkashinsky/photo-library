import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../sequelize';

export class File extends Model<
  InferAttributes<File>,
  InferCreationAttributes<File>
> {
  declare id: CreationOptional<number>;
  declare folderId: string;
  declare path: string;
  declare name: string;
  declare size: number;
  declare createDate: Date;
}

File.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  folderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  }
}, {
  tableName: 'files',
  timestamps: false,
  sequelize
});
