import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { FaceArea } from './face-area';

type PersonAttributes = {
  id: string;
  name: string;
}

type PersonCreationAttributes = Optional<PersonAttributes, 'id'>

@Table({ timestamps: false })
export class Person extends Model<PersonAttributes, PersonCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ allowNull: false })
  name!: string;

  @HasMany(() => FaceArea)
  faceAreas?: FaceArea[];
}
