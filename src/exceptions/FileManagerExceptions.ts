class DeleteFileException extends Error {
  constructor(error: string) {
    super(`Erro ao tentar deletar arquivo: ${error}`);
  };
};

class CountPdfFilesException extends Error {
  constructor(error: string) {
    super(`Erro ao tentar contar número de PDFs salvos: ${error}`);
  };
};

export {
  DeleteFileException,
  CountPdfFilesException,
};