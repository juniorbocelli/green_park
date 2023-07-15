import SanitizerString from './SanitizerString';

interface Elements {
  day: string;
  month: string;
  year: string;

  hour: string;
  minute: string;
  second: string;
  millisecond: string;
};

class MaskApply {
  public static twoZeros(number: string | number): string {
    return ("0" + String(number)).slice(-2);
  };

  public static getDateElements(timestamp: Date | number | string): Elements {
    var date: Date | number | string;
    var elements: Elements = {
      day: '',
      hour: '',
      millisecond: '',
      minute: '',
      month: '',
      second: '',
      year: ''
    };

    if (timestamp instanceof Date && !isNaN(timestamp.valueOf())) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    };

    elements.year = String(date.getFullYear());
    elements.month = this.twoZeros(date.getMonth() + 1);
    elements.day = this.twoZeros(date.getDate());

    elements.hour = this.twoZeros(date.getHours());
    elements.minute = this.twoZeros(date.getMinutes());
    elements.second = this.twoZeros(date.getSeconds());
    elements.millisecond = String(date.getMilliseconds());

    return elements;
  };

  public static printDateFromTimestamp(timestamp: Date | number | string): string {
    const el = this.getDateElements(timestamp);

    return el.day + "/" + el.month + "/" + el.year;
  };

  public static printDateFromTimestampUS(timestamp: Date | number | string): string {
    const el = this.getDateElements(timestamp);

    return el.year + "-" + el.month + "-" + el.day;
  };

  public static printMonthYearFromTimestamp(timestamp: Date | number | string): string {
    const el = this.getDateElements(timestamp);

    return el.month + "/" + el.year;
  };

  public static maskCompetenceFromTimestamp(timestamp: Date | number | string): string {
    const el = this.getDateElements(timestamp);

    return el.month + "/" + el.year;
  };

  public static maskDateTimeFromTimestamp(timestamp: Date | number | string): string {
    const el = this.getDateElements(timestamp);

    return el.day + "/" + el.month + "/" + el.year + " " + el.hour + ":" + el.minute;
  };

  public static printTimestampSignature(timestamp?: Date | number | string): string {
    const el = this.getDateElements(timestamp || new Date());

    return `${el.year}-${el.month}-${el.day}_${el.hour}-${el.minute}-${el.second}_${el.millisecond}`;
  };

  public static printOracleDBTimestamp(timestamp?: Date | number | string): string {
    const el = this.getDateElements(timestamp || new Date());

    return `${el.year}-${el.month}-${el.day} ${el.hour}:${el.minute}:${el.second}`;
  };

  public static getMonthNameFromNumber(month: number): string | null {
    switch (month) {
      case 0:
        return "Janeiro";

      case 1:
        return "Fevereiro";

      case 2:
        return "Março";

      case 3:
        return "Abril";

      case 4:
        return "Maio";

      case 5:
        return "Junho";

      case 6:
        return "Julho";

      case 7:
        return "Agosto";

      case 8:
        return "Setembro";

      case 9:
        return "Outubro";

      case 10:
        return "Novembro";

      case 11:
        return "Dezembro";

      default:
        return null;
    };
  };

  public static getPTWeekDayFromAbbEN(w: string): string {
    switch (w) {
      case 'sun':
        return 'Domingo';

      case 'mon':
        return 'Segunda-feira';

      case 'tue':
        return 'Terça-feira';

      case 'wed':
        return 'Quarta-feira';

      case 'thu':
        return 'Quinta-feira';

      case 'fri':
        return 'Sexta-feira';

      case 'sat':
        return 'Sábado';

      default:
        return '-';
    };
  };

  public static getPTWeekDayFromEN(s: string): string {
    switch (s) {
      case 'sunday':
        return 'Domingo';

      case 'monday':
        return 'Segunda-feira';

      case 'tuesday':
        return 'Terça-feira';

      case 'wednesday':
        return 'Quarta-feira'

      case 'thursday':
        return 'Quinta-feira';

      case 'friday':
        return 'Sexta-feira';

      case 'saturday':
        return 'Sábado';

      default:
        return s;
    };
  };

  // 25 de Março, 2021 às 10:48
  public static readableDateTime(d: Date | number): string {
    let date: Date;

    if (d instanceof Date && !isNaN(d.valueOf())) {
      date = d;
    } else {
      date = new Date(d);
    };

    return `${date.getDay()} de ${this.getMonthNameFromNumber(date.getMonth())}, ${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`;
  };

  // yyyy-mm-dd to dd/mm/yyyy
  public static dateTransform(d: string): string {
    let parts = d.split('-');

    return `${this.twoZeros(parts[2])}/${this.twoZeros(parts[1])}/${parts[0]}`;
  };

  // dd/mm/yyyy to yyyy-mm-dd 
  public static dateUntransform(d: string): string {
    let parts = d.split('/');

    return `${parts[2]}-${this.twoZeros(parts[1])}-${this.twoZeros(parts[0])}`;
  };

  // Format 1.000.000,00
  public static maskMoney(number: number | string): string {
    let money: string;
    let intPart: string;
    let centPart: string;

    if (typeof (number) === "number") number = number.toFixed(2);

    money = String(number);

    if (money.indexOf("c") !== -1 || money.indexOf("C") !== -1) {
      money = "0";
    }

    money = money.replace(/\D/g, "");
    if (money === "") {
      money = "0";
    }
    money = parseInt(money).toString();

    if (money.length > 13) {
      money = money.substring(0, 14);
    }

    if (money.length < 3 && money === "0") {
      money = "000";
    } else {
      for (var i = money.length; i < 3; i++) {
        money = "0" + money;
      }
    }

    intPart = money.slice(0, money.length - 2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    centPart = money.slice(-2);

    money = intPart + "," + centPart;

    return money;
  };

  // Format 1.000.000,00
  public static decimalNumberBR(number: number | string, decimalPlace: number): string {
    let s: string;
    let intPart: string;
    let decimalPart: string;

    if (typeof (number) === "number") number = number.toFixed(decimalPlace);

    s = String(number);

    if (s.indexOf("c") !== -1 || s.indexOf("C") !== -1) {
      s = "0";
    }

    s = s.replace(/\D/g, "");
    if (s === "") {
      s = "0";
    }
    s = parseInt(s).toString();

    if (s.length > 13) {
      s = s.substring(0, 14);
    }

    if (s.length < 3 && s === "0") {
      s = "000";
    } else {
      for (var i = s.length; i < 3; i++) {
        s = "0" + s;
      }
    }

    intPart = s.slice(0, s.length - 2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    decimalPart = s.slice(-decimalPlace);

    s = intPart + "," + decimalPart;

    return s;
  };

  public static maskCpf(value: string): string {
    let nValue = SanitizerString.onlyNumbers(value);

    if (nValue.length > 11) {
      nValue = nValue.substring(0, 11);
    };

    nValue = nValue.replace(/^(\d{3})(\d)/, "$1.$2");
    nValue = nValue.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    nValue = nValue.replace(/^(\d{3})\.(\d{3}).(\d{3})(\d)/, "$1.$2.$3-$4");

    return nValue;
  };

  public static maskCnpj(value: string): string {
    let nValue = SanitizerString.onlyNumbers(value);

    if (nValue.length > 14) {
      nValue = nValue.substring(0, 14);
    };

    nValue = nValue.replace(/^(\d{2})(\d)/, "$1.$2");
    nValue = nValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    nValue = nValue.replace(/\.(\d{3})(\d)/, ".$1/$2");
    nValue = nValue.replace(/(\d{4})(\d)/, "$1-$2");

    return nValue;
  };

  public static maskCpfOrCnpj(value: string): string {
    let nValue = SanitizerString.onlyNumbers(value);

    if (nValue.length <= 11)
      return this.maskCpf(nValue);
    else
      return this.maskCnpj(nValue);
  };

  public static maskCep(s: string): string {
    let digits = SanitizerString.onlyNumbers(s);

    if (digits.length !== 8) return "";

    return digits.slice(0, 2) + "." + digits.slice(2, 5) + "-" + digits.slice(5, 8);
  };

  public static maskCellPhone(s: string): string {
    let digits = SanitizerString.onlyNumbers(s);

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  public static maskPhone(s: string): string {
    let digits = SanitizerString.onlyNumbers(s);

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  };

  public static maskPhoneOrCell(s: string): string {
    let digits = SanitizerString.onlyNumbers(s);

    if (digits.length <= 10)
      return this.maskPhone(digits);
    else
      return this.maskCellPhone(digits);
  };

  public static maskCreditCard(s: string): string {
    let digits = SanitizerString.onlyNumbers(s);

    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)} ${digits.slice(10, 13)}`;
  };
};

export default MaskApply;