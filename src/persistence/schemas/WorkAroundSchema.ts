import { DataTypes, Model, } from 'sequelize';

import db from '../ConnectionFactory';
import { WorkAroundAttributes, WorkAroundInput } from '../dao/interfaces/WorkAroundAttributes';
import LotSchema from './LotSchema';

class WorkAroundSchema extends Model<WorkAroundAttributes, WorkAroundInput> implements WorkAroundAttributes {
  id!: number;
  lot!: LotSchema;
  idLot!: number
  unitName!: string;
  invoiceOrder!: number;
};

WorkAroundSchema.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idLot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitName: {
      type: DataTypes.STRING(100),
    },
    invoiceOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'work_arounds',
    sequelize: db,
  }
);

WorkAroundSchema.belongsTo(LotSchema, {
  foreignKey: 'idLot',
  as: 'lot',
});
// LotSchema.hasOne(WorkAroundSchema, {sourceKey: 'id'});

export default WorkAroundSchema;