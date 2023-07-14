import DAO from './interfaces/DAO';
import Invoice from '../../models/Invoice';
import InvoiceSchema from '../schemas/InvoiceSchema';
import Lot from '../../models/Lot';
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
      payerName: model.payerName,
      value: model.value,
      customText: model.customText,
      active: model.active,
      createdAt: model.createdAt,
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
    const invoicesSchemas = await InvoiceSchema.findAll();
    const invoices = invoicesSchemas.map(s => this.toModel(s));

    return invoices;
  };
};

export default DAOInvoice;