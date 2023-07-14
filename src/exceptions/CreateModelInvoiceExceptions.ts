class PayerNameIsEmptyException extends Error {
  constructor() {
    super("O nome so sacado deve ser preenchido");
  };
};

class CustomTextIsEmptyException extends Error {
  constructor() {
    super("O valor da linha digitável deve ser preenchido");
  };
};

class ValueIsNotValidException extends Error {
  constructor(value: string) {
    super(`O valor da unidade ${value} não é um valor válido`);
  };
};

export {
  PayerNameIsEmptyException,
  CustomTextIsEmptyException,
  ValueIsNotValidException,
};