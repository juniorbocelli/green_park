import DAO from './interfaces/DAO';
import Invoice from '../../models/entities/Invoice';
import InvoiceSchema from '../schemas/InvoiceSchema';
import Lot from '../../models/entities/Lot';
import LotSchema from '../schemas/LotSchema';

class DAOInvoice implements DAO<Invoice, InvoiceSchema, number> {
  public toModel(schema: InvoiceSchema): Invoice {
    const lotInterface = schema.lot;
    const lot = new Lot(lotInterface.id, lotInterface.name, lotInterface.active, lotInterface.createdAt);
    const invoiceJson = schema.toJSON();
    const invoice = new Invoice(invoiceJson.id, invoiceJson.payerName, lot, invoiceJson.value, invoiceJson.customText, invoiceJson.active, invoiceJson.createdAt);

    return invoice;
  };

  public toSchema(model: Invoice): InvoiceSchema {
    const lotSchema = LotSchema.build({
      id: model.lot.id,
      name: model.lot.name,
      active: model.lot.active,
      createdAt: model.lot.createdAt,
    });

    const invoiceSchema = InvoiceSchema.build({
      id: model.id,
      idLot: lotSchema.id,
      payerName: model.payerName,
      value: model.value,
      customText: model.customText,
      active: model.active,
      createdAt: model.createdAt,
    },
      {
        include: {
          model: LotSchema,
          as: 'lot'
        }
      });

    invoiceSchema.lot = lotSchema;

    return invoiceSchema;
  };

  public async create(model: Invoice): Promise<Invoice> {
    const invoiceSchemaToSave = this.toSchema(model);
    const invoiceSchema = await invoiceSchemaToSave.save();

    return this.toModel(invoiceSchema);
  };

  public async findAll(where?: Object): Promise<Invoice[]> {
    const invoicesSchemas = await InvoiceSchema.findAll({
      include: {
        model: LotSchema,
        as: 'lot'
      }
    });
    const invoices = invoicesSchemas.map(s => this.toModel(s));

    return invoices;
  };

  public async findByPk(id: number): Promise<Invoice | null> {
    const invoiceSchema = await InvoiceSchema.findByPk(id, {
      include: { model: LotSchema, as: 'lot' }
    });
    if (invoiceSchema instanceof InvoiceSchema)
      return this.toModel(invoiceSchema);

    return null;
  };

  public async selectCount(where?: Object): Promise<number> {
    const value = await InvoiceSchema.count();

    return value;
  };
};

export default DAOInvoice;