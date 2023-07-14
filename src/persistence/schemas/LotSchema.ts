import { DataTypes, Model } from 'sequelize';

import db from '../ConnectionFactory';
import { LotAttributes, LotInput } from '../dao/interfaces/LotAttributes';
import InvoiceSchema from './InvoiceSchema';
import WorkAroundSchema from './WorkAroundSchema';

class LotSchema extends Model<LotAttributes, LotInput> implements LotAttributes {
  public id!: number;
  public name!: string;
  public active!: boolean;
  public createdAt!: Date;
};

LotSchema.init(
  {
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
  },
  {
    sequelize: db,
    tableName: 'lots'
  }
);

export default LotSchema;

