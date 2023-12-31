import { DataTypes, Model } from 'sequelize';

import db from '../ConnectionFactory';
import { InvoiceAttributes, InvoiceInput } from '../dao/interfaces/InvoiceAttributes';
import LotSchema from './LotSchema';

class InvoiceSchema extends Model<InvoiceAttributes, InvoiceInput> implements InvoiceAttributes {
  id!: number;
  payerName!: string;
  value!: number;
  customText!: string;
  lot!: LotSchema;
  idLot!: number;
  active!: boolean;
  createdAt!: Date;
};

InvoiceSchema.init(
  {
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
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customText: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    idLot: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: 'invoices',
    sequelize: db,
  }
);

InvoiceSchema.belongsTo(LotSchema, {
  foreignKey: 'idLot',
  as: 'lot'
});

export default InvoiceSchema;