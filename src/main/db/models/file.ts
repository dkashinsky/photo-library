import { Table, Column, Model, PrimaryKey, ForeignKey } from 'sequelize-typescript'
import { Folder } from './folder';

@Table({ timestamps: false })
export class File extends Model {
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
