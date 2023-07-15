class GetPdfPagesException extends Error {
  constructor(error: string) {
    super(`Erro ao tentar pegar quantidade de páginas do PDF: ${error}`);
  };
};

class GetIndividualPdfPageException extends Error {
  constructor(indexOfPage: number, error: string) {
    super(`Erro a página ${indexOfPage} do PDF: ${error}`);
  };
};

export {
  GetPdfPagesException,
  GetIndividualPdfPageException,
};