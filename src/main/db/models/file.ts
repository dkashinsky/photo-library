import { Table, Column, Model, PrimaryKey, ForeignKey } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { Folder } from './folder';

type FileAttributes = {
  id: number;
  folderId: string;
  path: string;
  name: string;
  size: number;
  createDate: Date;
}

type FileCreationAttributes = Optional<FileAttributes, 'id'>

@Table({ timestamps: false })
export class File extends Model<FileAttributes, FileCreationAttributes> {
  @PrimaryKey
  @Column
  id!: number;

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
}
