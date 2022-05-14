import { Table, Column, Model, ForeignKey, Index, Unique, createIndexDecorator } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';
import { FaceArea } from './face-area';
import { Person } from './person';

type PersonDescriptorRefAttributes = {
  id: number;
  personId: string;
  faceAreaId: string;
}

type PersonDescriptorRefCreationAttributes = Optional<PersonDescriptorRefAttributes, 'id'>

const CompoundUniqueIndex = createIndexDecorator({
  name: 'person-descriptor-link',
  unique: true,
})

@Table({ timestamps: false })
export class PersonDescriptorRef extends Model<PersonDescriptorRefAttributes, PersonDescriptorRefCreationAttributes> {
  @ForeignKey(() => Person)
  @CompoundUniqueIndex
  @Column({ allowNull: false })
  personId!: string;

  @ForeignKey(() => FaceArea)
  @CompoundUniqueIndex
  @Column({ allowNull: false })
  faceAreaId!: string;
}
