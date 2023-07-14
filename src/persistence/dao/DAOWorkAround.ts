import DAO from './interfaces/DAO';
import WorkAround from '../../models/WorkAround';
import WorkAroundSchema from '../schemas/WorkAroundSchema';
import Lot from '../../models/Lot';
import LotSchema from '../schemas/LotSchema';

class DAOWorkAround implements DAO<WorkAround, WorkAroundSchema, number> {
  public toModel(schema: WorkAroundSchema): WorkAround {
    const lotInterface = schema.lot;
    const lot = new Lot(lotInterface.id, lotInterface.name, lotInterface.active, lotInterface.createdAt);
    const workAroundJson = schema.toJSON();
    const workAround = new WorkAround(workAroundJson.id, lot, workAroundJson.unitName, workAroundJson.invoiceOrder);

    return workAround;
  };

  public toSchema(model: WorkAround): WorkAroundSchema {
    const lotSchema = LotSchema.build({
      id: model.lot.id,
      name: model.lot.name,
      active: model.lot.active,
      createdAt: model.lot.createdAt,
    });

    const workAroundSchema = WorkAroundSchema.build({
      id: model.id,
      unitName: model.unitName,
      invoiceOrder: model.invoiceOrder,
    });
    workAroundSchema.lot = lotSchema;

    return workAroundSchema;
  };

  public async create(model: WorkAround): Promise<WorkAround> {
    const workAroundSchemaToSave = this.toSchema(model);
    const workAroundSchema = await workAroundSchemaToSave.save();

    return this.toModel(workAroundSchema);
  };

  public async findAll(where?: Object): Promise<WorkAround[]> {
    const worAroundsSchemas = await WorkAroundSchema.findAll();
    const workArounds = worAroundsSchemas.map(s => this.toModel(s));

    return workArounds;
  };
};

export default DAOWorkAround;