import { Optional } from 'sequelize';
import { LotOutput } from './LotAttributes';

export interface InvoiceAttributes {
  id: number;
  payerName: string;
  value: number;
  customText: string;
  active: boolean;
  createdAt: Date;
};

export interface InvoiceInput extends Optional<InvoiceAttributes, 'id'> { };
export interface InvoiceOutput extends Required<InvoiceAttributes> { };