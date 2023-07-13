import { DataTypes } from 'sequelize';

import db from '../ConnectionFactory';
import LotSchema from './LotSchema';

const WorkAroundSchema = db.define('WorkAround', {
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
  }
});

// WorkAroundSchema.belongsTo(LotSchema);

export default WorkAroundSchema;