import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { Folder } from './folder';

type FileAttributes = {
  id: string;
  folderId: string;
  path: string;
  name: string;
  size: number;
  createDate: Date;
  isProcessed: boolean;
}

type FileCreationAttributes = Optional<FileAttributes, 'id' | 'isProcessed'>

@Table({ timestamps: false })
export class File extends Model<FileAttributes, FileCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Folder)
  @Column({ allowNull: false })
  folderId!: string;

  @Column({ allowNull: false })
  path!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  size!: number;

  @Column({ allowNull: false })
  createDate!: Date;

  @Column({ allowNull: false, defaultValue: false })
  isProcessed!: boolean;
}
