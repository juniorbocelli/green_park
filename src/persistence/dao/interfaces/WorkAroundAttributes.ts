import { Optional } from 'sequelize';
import LotSchema from '../../schemas/LotSchema';

export interface WorkAroundAttributes {
  id: number;
  idLot: number;
  unitName: string;
  invoiceOrder: number;
};

export interface WorkAroundInput extends Optional<WorkAroundAttributes, 'id'> { };
export interface WorkAroundOutput extends Required<WorkAroundAttributes> { };