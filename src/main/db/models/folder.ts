import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../sequelize';

export class Folder extends Model<
  InferAttributes<Folder>,
  InferCreationAttributes<Folder>
> {
  declare id: CreationOptional<string>;
  declare path: string;
  declare isProcessed: CreationOptional<boolean>;
}

Folder.init({
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
}, {
  tableName: 'folders',
  timestamps: false,
  sequelize,
});
