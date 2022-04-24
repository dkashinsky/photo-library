import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { File } from './file';

type FaceAreaAttributes = {
  id: string;
  fileId: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
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
  x0!: number;

  @Column({ allowNull: false })
  y0!: number;

  @Column({ allowNull: false })
  x1!: number;

  @Column({ allowNull: false })
  y1!: number;
}
