import { DataTypes } from 'sequelize';

import db from '../ConnectionFactory';
import InvoiceSchema from './InvoiceSchema';
import WorkAroundS from './WorkAroundSchema';

const LotSchema = db.define('Lot', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
});

LotSchema.hasMany(InvoiceSchema, {
  foreignKey: 'idLot'
});

LotSchema.hasOne(WorkAroundS, {
  foreignKey: 'idLot'
});

export default LotSchema;

