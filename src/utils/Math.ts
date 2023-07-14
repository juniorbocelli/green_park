class Math {
  public static currencyStringToFloat(c: string | number): number {
    if (typeof (c) === 'number')
      return c;

    let number = parseFloat(c.replace(/[r$\s.]/gi, '').replace(',', '.'));
    if (typeof (number) !== 'number')
      throw new Error("Erro ao tentar converter moeda para numero Real");

    return number;
  };

  public static floatOrUndefined(c: string | number): number | undefined {
    let number: number;

    if (typeof (c) === 'number')
      return c;

    if (toString.call(c) !== '[object String]')
      return undefined;

    try {
      number = this.currencyStringToFloat(c)
    } catch (error: any) {
      return undefined
    };

    return number;
  };

  public static toCurrencyString(number: number | string): string {
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

  public static floatToCurrency(value: string | number): number {
    const currencyString = this.toCurrencyString(value);
    const currencyFloat = this.currencyStringToFloat(currencyString);

    return currencyFloat;
  };
};

export default Math;