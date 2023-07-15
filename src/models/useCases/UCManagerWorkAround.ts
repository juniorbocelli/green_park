import DAOWorkAround from '../../persistence/dao/DAOWorkAround';
import WorkAround from '../entities/WorkAround';

class UCManagerWorkAround {
  private daoWorkAround: DAOWorkAround;

  constructor(daoWorkAround: DAOWorkAround) {
    this.daoWorkAround = daoWorkAround;
  };

  public async create(workAround: WorkAround): Promise<WorkAround> {
    const newWorkAround = await this.daoWorkAround.create(workAround);

    return newWorkAround;
  };

  public async findAll(where?: Object): Promise<WorkAround[]> {
    const workArounds = await this.daoWorkAround.findAll(where);

    return workArounds;
  };

  public async findByPk(id: number): Promise<WorkAround | null> {
    const workAround = await this.daoWorkAround.findByPk(id);

    return workAround;
  };

  public async selectCount(where?: Object): Promise<number> {
    const value = await this.daoWorkAround.selectCount(where);

    return value;
  };

  public async findByLotId(idLot: number): Promise<WorkAround | null> {
    const workAround = await this.daoWorkAround.findByLotId(idLot);

    return workAround;
  };
};

export default UCManagerWorkAround;