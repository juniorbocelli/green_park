class NoFileUploadedException extends Error {
  constructor() {
    super("Nenhum arquivo foi enviado");
  };
};

export {
  NoFileUploadedException,
};