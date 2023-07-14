import { Optional } from 'sequelize';

export interface LotAttributes {
  id: number;
  name: string;
  active: boolean;
  createdAt: Date;
};

export interface LotInput extends Optional<LotAttributes, 'id'> { };
export interface LotOutput extends Required<LotAttributes> { };