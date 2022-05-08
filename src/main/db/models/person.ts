import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { Optional } from 'sequelize/types';

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
}
