import { IInvoiceCsvRow } from '../../global/interfaces/invoice';
import DAOInvoice from '../../persistence/dao/DAOInvoice';
import DAOWorkAround from '../../persistence/dao/DAOWorkAround';
import Invoice from '../entities/Invoice';
import {
  InvoicesNumberNotEqualToLotsNumberException,
  LotNotFoundException,
} from '../../exceptions/UCManagerInvoiceExceptions';

class UCManagerInvoice {
  private daoInvoice: DAOInvoice;
  private daoWorkAround: DAOWorkAround;

  constructor(daoInvoice: DAOInvoice, daoWorkAround: DAOWorkAround) {
    this.daoInvoice = daoInvoice;
    this.daoWorkAround = daoWorkAround;
  };

  public async create(invoice: Invoice): Promise<Invoice> {
    const newInvoice = await this.daoInvoice.create(invoice);

    return newInvoice;
  };

  public async findAll(where?: Object): Promise<Invoice[]> {
    const invoices = await this.daoInvoice.findAll(where);

    return invoices;
  };

  public async findByPk(id: number): Promise<Invoice | null> {
    const invoice = await this.daoInvoice.findByPk(id);

    return invoice;
  };

  public async createByDemand(rows: IInvoiceCsvRow[]): Promise<Invoice[] | undefined> {
    try {
      const numberOfLots = await this.daoWorkAround.selectCount();
      // Verify if number of invoices is equal a lots quantity
      if (numberOfLots !== rows.length)
        throw new InvoicesNumberNotEqualToLotsNumberException(numberOfLots, rows.length);

      const invoicesToInsert: Invoice[] = [];

      for (let i = 0; i < rows.length; i++) {
        const workAround = await this.daoWorkAround.findByUnitName(String(rows[i].unidade));

        if (workAround === null)
          throw new LotNotFoundException(String(rows[i].unidade));

        invoicesToInsert.push(Invoice.getToNew(rows[i].nome, workAround.lot, rows[i].valor, String(rows[i].linha_digitavel)));
      };

      const insertedInvoices: Invoice[] = [];
      for (let i = 0; i < invoicesToInsert.length; i++) {
        const invoice = await this.daoInvoice.create(invoicesToInsert[i]);
        insertedInvoices.push(invoice);
      };

      return insertedInvoices;

    } catch (error) {
      throw new Error(error as string);
    };
  };
};

export default UCManagerInvoice; 