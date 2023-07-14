import DAOLot from '../../persistence/dao/DAOLot';
import DAOWorkAround from '../../persistence/dao/DAOWorkAround';
import Lot from '../entities/Lot';

class UCManagerLot {
  private daoLot: DAOLot;
  private daoWorkAround: DAOWorkAround;

  constructor(daoLot: DAOLot, daoWorkAround: DAOWorkAround) {
    this.daoLot = daoLot;
    this.daoWorkAround = daoWorkAround;
  };

  public async create(lot: Lot): Promise<Lot> {
    const newLot = await this.daoLot.create(lot);

    return newLot;
  };

  public async findAll(where?: Object): Promise<Lot[]> {
    const lots = await this.daoLot.findAll(where);

    return lots;
  };

  public async findByPk(id: number): Promise<Lot | null> {
    const lot = await this.daoLot.findByPk(id);

    return lot;
  };

  public async findByExternalName(name: string): Promise<Lot | null> {
    const workAround = await this.daoWorkAround.findByUnitName(name);

    if (workAround === null)
      return null;

    return workAround.lot;
  };

  public async findByInvoiceOrder(order: number): Promise<Lot | null> {
    const workAround = await this.daoWorkAround.findByInvoiceOrder(order);

    if (workAround === null)
      return null;

    return workAround.lot;
  };

  public async findEntitiesNumber(): Promise<number> {
    const value = await this.daoLot.selectCount();

    return value;
  };
};

export default UCManagerLot;