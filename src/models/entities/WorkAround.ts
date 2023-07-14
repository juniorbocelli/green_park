import Lot from './Lot';

class WorkAround {
  private _id?: number;
  private _lot: Lot;
  private _unitName: string;
  private _invoiceOrder: number;

  constructor(id: number | undefined, lot: Lot, unitName: string, invoiceOrder: number) {
    this._id = id;
    this._lot = lot;
    this._unitName = unitName;
    this._invoiceOrder = invoiceOrder;
  };

  public static getToNew(lot: Lot, unitName: string, invoiceOrder: number): WorkAround {
    const workAround = new WorkAround(undefined, lot, unitName, invoiceOrder);

    return workAround;
  };

  public get id() {
    return this._id;
  };

  public set id(id: number | undefined) {
    this._id = id;
  };

  public get lot() {
    return this._lot;
  };

  public set lot(lot: Lot) {
    this._lot = lot;
  };

  public get unitName() {
    return this._unitName;
  };

  public set unitName(unitName: string) {
    this.unitName = unitName;
  };

  public get invoiceOrder() {
    return this._invoiceOrder;
  };

  public set invoiceOrder(invoiceOrder: number) {
    this._invoiceOrder = invoiceOrder;
  };
};

export default WorkAround;