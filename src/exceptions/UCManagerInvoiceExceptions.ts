class InvoicesNumberNotEqualToLotsNumberException extends Error {
  constructor(lotsNumber: number, invoicesNumber: number) {
    super(`O arquivo enviado contém ${invoicesNumber}, mas ${lotsNumber} estão cadastrados`);
  };
};

class LotNotFoundException extends Error {
  constructor(name: string) {
    super(`O lote de nome ${name} não foi encontrado`);
  };
};

export {
  InvoicesNumberNotEqualToLotsNumberException,
  LotNotFoundException,
};