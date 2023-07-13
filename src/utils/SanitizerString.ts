class SanitizerString {
  public static onlyNumbers(value: string): string {
    return String(value).replace(/\D/g, "");
  };

  public static removeSpaces(string: string): string {
    return string.trim();
  };

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/ToString
  public static stringOrUndefined(value: any): string | undefined {
    if (toString.call(value) !== "[object String]") return undefined;

    if (this.removeSpaces(value).length === 0) return undefined;

    return this.removeSpaces(value);
  };

  public static stringOrNull(value: any): string | null {
    if (toString.call(value) !== "[object String]") return null;

    if (this.removeSpaces(value).length === 0) return null;

    return this.removeSpaces(value);
  };

  public static stringOrEmpty(value: any): string {
    if (toString.call(value) !== "[object String]") return "";
    else return this.removeSpaces(value);
  };

  public static safeSplit(string: string, divisor: string): Array<string> {
    let s = string.split(divisor);

    s = s.map((item) => {
      return this.removeSpaces(item);
    });

    return s;
  };

  public static removeSpecialCharacters(text: any, separator?: string): string {
    if (toString.call(text) !== "[object String]") return separator || "";

    return text.replace(/[^\w ]/g, separator || "");
  };

  public static normalizeText(text: any, separator?: string): string {
    if (toString.call(text) !== "[object String]") return separator || "";

    return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, separator || "");
  };

  public static normalizeTextLC(text: any, separator?: string): string {
    if (toString.call(text) !== "[object String]") return separator || "";

    return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, separator || "").toLowerCase();
  };

  public static removeQuotes(text: any): string {
    if (toString.call(text) !== "[object String]") return "";

    return text.replace(/['"`]/g, "");
  };

  public static prepareEmail(email: string): string {
    let _email = this.removeQuotes(email)

    return this.removeSpaces(_email).toLowerCase();
  };

  public static secureFilename(text: string): string {
    var _text = this.removeSpaces(text);
    _text = this.removeQuotes(_text);
    return this.normalizeTextLC(_text).replace(/\s/g, "_");
  };

  public static isString(s: any): boolean {
    if (toString.call(s) !== "[object String]")
      return true;

    return typeof s === 'string' || s instanceof String;
  }
};

export default SanitizerString;