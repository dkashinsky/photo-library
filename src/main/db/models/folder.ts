import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ timestamps: false })
export class Folder extends Model {
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
}
