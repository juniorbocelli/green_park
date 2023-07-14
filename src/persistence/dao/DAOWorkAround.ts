import DAO from './interfaces/DAO';
import WorkAround from '../../models/entities/WorkAround';
import WorkAroundSchema from '../schemas/WorkAroundSchema';
import Lot from '../../models/entities/Lot';
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

  public async findByPk(id: number): Promise<WorkAround | null> {
    const workAroundSchema = await WorkAroundSchema.findByPk(id);
    if (workAroundSchema instanceof WorkAroundSchema)
      return this.toModel(workAroundSchema);

    return null;
  };

  public async selectCount(where?: Object): Promise<number> {
    const value = await WorkAroundSchema.count();

    return value;
  };

  public async findByUnitName(name: string): Promise<WorkAround | null> {
    const workAround = await WorkAroundSchema.findOne({
      where: {
        unitName: name,
      }
    });

    if (workAround instanceof WorkAroundSchema)
      return this.toModel(workAround);

    return null;
  };

  public async findByInvoiceOrder(order: number): Promise<WorkAround | null> {
    const workAround = await WorkAroundSchema.findOne({
      where: {
        invoiceOrder: order,
      }
    });

    if (workAround instanceof WorkAroundSchema)
      return this.toModel(workAround);

    return null;
  };
};

export default DAOWorkAround;