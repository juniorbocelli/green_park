import SanitizerString from '../utils/SanitizerString';
import { NameIsEmpty } from '../exceptions/CreateModelLotExceptions';

class Lot {
  private _id?: number;
  private _name: string;
  private _active: boolean;
  private _createdAt: Date;

  constructor(id: number | undefined, name: string, active: boolean, createdAt: Date) {
    this._id = id;
    this._name = name;
    this._active = active;
    this._createdAt = createdAt;
  };

  public static getToNew(name: string): Lot {
    const lot = new Lot(undefined, name, true, new Date());

    return lot;
  };

  public get id() {
    return this._id;
  };

  public set id(id: number | undefined) {
    this._id = id;
  };

  public get name() {
    return this._name;
  };

  public set name(name: string) {
    if (SanitizerString.stringOrNull(name) === null)
      throw new NameIsEmpty();

    this._name = name;
  };

  public get active() {
    return this._active;
  };

  public set active(active: boolean) {
    this._active = active;
  };

  public get createdAt() {
    return this._createdAt;
  };

  public set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  };
};

export default Lot;