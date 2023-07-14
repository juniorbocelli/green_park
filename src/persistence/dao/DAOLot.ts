import DAO from './interfaces/DAO';
import Lot from '../../models/entities/Lot';
import LotSchema from '../schemas/LotSchema';

class DAOLot implements DAO<Lot, LotSchema, number> {

  public toModel(schema: LotSchema): Lot {
    const json = schema.toJSON();
    const lot = new Lot(json.id, json.name, json.active, json.createdAt);

    return lot;
  };

  public toSchema(model: Lot): LotSchema {
    const lotSchema = LotSchema.build({
      id: model.id,
      name: model.name,
      active: model.active,
      createdAt: model.createdAt
    });

    return lotSchema;
  };

  public async create(model: Lot): Promise<Lot> {
    const lotSchemaToSave = this.toSchema(model);
    const lotSchema = await lotSchemaToSave.save();

    return this.toModel(lotSchema);
  };

  public async findAll(where?: Object): Promise<Lot[]> {
    const lotsSchemas = await LotSchema.findAll();
    const lots = lotsSchemas.map(s => this.toModel(s));

    return lots;
  };

  public async findByPk(id: number): Promise<Lot | null> {
    const lotSchema = await LotSchema.findByPk(id);
    if (lotSchema instanceof LotSchema)
      return this.toModel(lotSchema);

    return null;
  };

  public async selectCount(where?: Object): Promise<number> {
    const value = await LotSchema.count();

    return value;
  };
};

export default DAOLot;