import Lot from './Lot';
import {
  CustomTextIsEmptyException,
  PayerNameIsEmptyException,
  ValueIsNotValidException
} from '../../exceptions/CreateModelInvoiceExceptions';
import SanitizerString from '../../utils/SanitizerString';
import Math from '../../utils/Math';

class Invoice {
  private _id?: number;
  private _payerName: string;
  private _lot: Lot;
  private _value: number;
  private _customText: string;
  private _active: boolean;
  private _createdAt: Date;

  constructor(id: number | undefined, payerName: string, lot: Lot, value: number | string, customText: string, active: boolean, createdAt: Date) {
    this._id = id;

    if (SanitizerString.stringOrNull(payerName) === null)
      throw new PayerNameIsEmptyException();
    this._payerName = payerName;

    this._lot = lot;

    if (typeof Math.floatOrUndefined(value) === 'undefined')
      throw new ValueIsNotValidException(String(value));
    this._value = Math.floatToCurrency(value);

    if (SanitizerString.stringOrNull(customText) === null)
      throw new CustomTextIsEmptyException();
    this._customText = customText;

    this._active = active;
    this._createdAt = createdAt;
  };

  public static getToNew(payerName: string, lot: Lot, value: number | string, customText: string): Invoice {
    const invoice = new Invoice(undefined, payerName, lot, value, customText, true, new Date());

    return invoice;
  };

  public get id() {
    return this._id;
  };

  public set id(id: number | undefined) {
    this._id = id;
  };

  public get payerName() {
    return this._payerName;
  };

  public set payerName(payerName: string) {
    if (SanitizerString.stringOrNull(payerName) === null)
      throw new PayerNameIsEmptyException();

    this._payerName = payerName;
  };

  public get lot() {
    return this._lot;
  };

  public set lot(lot: Lot) {
    this._lot = lot;
  };

  public get value() {
    return this._value;
  };

  public set value(value: number) {
    if (typeof Math.floatOrUndefined(value) === 'undefined')
      throw new ValueIsNotValidException(String(value));

    this._value = Math.floatToCurrency(value);
  };

  public get customText() {
    return this._customText;
  };

  public set customText(customText: string) {
    if (SanitizerString.stringOrNull(customText) === null)
      throw new CustomTextIsEmptyException();

    this._customText = customText;
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

export default Invoice;