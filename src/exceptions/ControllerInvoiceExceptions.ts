class NoFileUploadedException extends Error {
  constructor() {
    super("Nenhum arquivo foi enviado");
  };
};

class InvoiceNumbeNotEqualLotsNumberException extends Error {
  constructor(invoicesNumber: number, lotsNumber: number) {
    super(`Existem ${lotsNumber} lotes cadastrados, mas o arquivo PDF contém ${invoicesNumber} boletos`);
  };
};

class NotExistInvoicesInDatabaseException extends Error {
  constructor() {
    super("Não existem boletos cadastrados no banco de dados");
  };
};

class AllInvoicesAlreadyHasPdfException extends Error {
  constructor() {
    super("Todas os boletos do banco de dados já possuem arquivo");
  };
};

class InvoiceNotExistException extends Error {
  constructor(invoice: number) {
    super(`A nota requisitada com id ${invoice} não existe`);
  };
};

class GeneratePdfFileException extends Error {
  constructor() {
    super("Todas os boletos do banco de dados já possuem arquivo");
  };
};

export {
  NoFileUploadedException,
  InvoiceNumbeNotEqualLotsNumberException,
  NotExistInvoicesInDatabaseException,
  AllInvoicesAlreadyHasPdfException,
  InvoiceNotExistException,
  GeneratePdfFileException,
};