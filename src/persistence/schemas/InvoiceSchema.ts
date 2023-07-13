import { DataTypes } from 'sequelize';
import db from '../ConnectionFactory';
import LotSchema from './LotSchema';

const InvoiceSchema = db.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  payerName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  idLot: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  customText: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  report: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
});

// InvoiceSchema.belongsTo(LotSchema);

export default InvoiceSchema;