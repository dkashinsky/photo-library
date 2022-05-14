import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { FaceArea } from './face-area';
import { PersonDescriptorRef } from './person-descriptor-ref';

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

  @HasMany(() => PersonDescriptorRef)
  descriptorRefs?: Array<PersonDescriptorRef>;
}
