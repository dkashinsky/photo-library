import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { File } from './file';

type FolderAttributes = {
  id: string;
  path: string;
  isProcessed: boolean;
}

type FolderCreationAttributes = Optional<FolderAttributes, 'id' | 'isProcessed'>

@Table({ timestamps: false })
export class Folder extends Model<FolderAttributes, FolderCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ allowNull: false })
  path!: string;

  @Column({ allowNull: false, defaultValue: false })
  isProcessed!: boolean;

  @HasMany(() => File)
  faceAreas!: File[];
}
