class NameIsEmptyException extends Error {
  constructor() {
    super("O nome do lote deve ser preenchido");
  };
};

export { NameIsEmptyException };