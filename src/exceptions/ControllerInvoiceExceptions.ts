class FileExtentionIsNotCsvException extends Error {
  constructor() {
    super("O arquivo enviado deve ser csv");
  };
};

class NoFileUploadedException extends Error {
  constructor() {
    super("Nenhum arquivo foi enviado");
  }
};

export {
  FileExtentionIsNotCsvException,
  NoFileUploadedException,
};