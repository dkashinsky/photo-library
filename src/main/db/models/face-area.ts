import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { File } from './file';

type FaceAreaAttributes = {
  id: string;
  fileId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

type FaceAreaCreationAttributes = Optional<FaceAreaAttributes, 'id'>

@Table({ timestamps: false })
export class FaceArea extends Model<FaceAreaAttributes, FaceAreaCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => File)
  @Column({ allowNull: false })
  fileId!: string;

  @Column({ allowNull: false })
  x!: number;

  @Column({ allowNull: false })
  y!: number;

  @Column({ allowNull: false })
  width!: number;

  @Column({ allowNull: false })
  height!: number;
}
