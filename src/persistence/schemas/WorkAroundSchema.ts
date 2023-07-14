import { DataTypes, Model } from 'sequelize';

import db from '../ConnectionFactory';
import { LotOutput } from '../dao/interfaces/LotAttributes';
import { WorkAroundAttributes, WorkAroundInput } from '../dao/interfaces/WorkAroundAttributes';
import LotSchema from './LotSchema';

class WorkAroundSchema extends Model<WorkAroundAttributes, WorkAroundInput> implements WorkAroundAttributes {
  id!: number;
  lot!: LotOutput
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
    unitName: {
      type: DataTypes.STRING(100),
    },
    invoiceOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  },
  {
    tableName: 'work_arounds',
    sequelize: db,
  }
);

WorkAroundSchema.belongsTo(LotSchema, {
  foreignKey: 'idLot',
  targetKey: 'id',
  as: 'lot'
});

export default WorkAroundSchema;