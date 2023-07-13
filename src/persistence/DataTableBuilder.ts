import LotSchema from './schemas/LotSchema';
import InvoiceSchema from './schemas/InvoiceSchema';
import WorkAroundSchema from './schemas/WorkAroundSchema';

class DataTableBuilder {
  public static async builderDatabase() {
    this.lotSchemaSync();
    this.invoiceSchemaSync();
    this.workAroundSync();
  };

  private static async lotSchemaSync() {
    await LotSchema.sync();
  };

  private static async invoiceSchemaSync() {
    await InvoiceSchema.sync();
  };

  private static async workAroundSync() {
    await WorkAroundSchema.sync();
  };
};

export default DataTableBuilder;