import LotSchema from './schemas/LotSchema';
import InvoiceSchema from './schemas/InvoiceSchema';
import WorkAroundSchema from './schemas/WorkAroundSchema';
import DAOLot from './dao/DAOLot';
import DAOWorkAround from './dao/DAOWorkAround';
import UCManagerLot from '../models/useCases/UCManagerLot';
import Lot from '../models/entities/Lot';
import UCManagerWorkAround from '../models/useCases/UCManagerWorkAround';
import WorkAround from '../models/entities/WorkAround';

class DataTableBuilder {
  private static daoLot: DAOLot = new DAOLot();
  private static daoWorkAround: DAOWorkAround = new DAOWorkAround();

  private static lots: Lot[] = [
    Lot.getToNew('0000'),
    Lot.getToNew('0001'),
    Lot.getToNew('0002'),
    Lot.getToNew('0003')
  ];

  public static async builderDatabase() {
    // Create tables
    await this.lotSchemaSync();
    await this.invoiceSchemaSync();
    await this.workAroundSync();

    // Insert content
    await this.insertLots();
    await this.insertWorkArounds();
  };

  private static async lotSchemaSync() {
    await LotSchema.sync({ force: true });
  };

  private static async invoiceSchemaSync() {
    await InvoiceSchema.sync({ force: true });
  };

  private static async workAroundSync() {
    await WorkAroundSchema.sync({ force: true });
  };

  private static async insertLots() {
    const ucManagerLot = new UCManagerLot(this.daoLot, this.daoWorkAround);

    for (let i = 0; i < this.lots.length; i++)
      await ucManagerLot.create(this.lots[i]);
  };

  private static async insertWorkArounds() {
    const ucManagerLot = new UCManagerLot(this.daoLot, this.daoWorkAround);
    const ucManagerWorkAround = new UCManagerWorkAround(this.daoWorkAround);

    const lots = await ucManagerLot.findAll();
    console.log('LOTS', lots);
    const workArounds: WorkAround[] = [
      WorkAround.getToNew(lots[0], 'lote000', 2),
      WorkAround.getToNew(lots[3], 'lote003', 0),
      WorkAround.getToNew(lots[1], 'lote001', 1),
      WorkAround.getToNew(lots[2], 'lote002', 3)
    ];

    console.log('WORKAROUNDS', workArounds);

    for (let i = 0; i < lots.length; i++)
      await ucManagerWorkAround.create(workArounds[i]);
  };
};

export default DataTableBuilder;