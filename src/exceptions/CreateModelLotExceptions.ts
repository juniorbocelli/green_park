class NameIsEmpty extends Error {
    constructor() {
        super("O nome do lote deve ser preenchido");
    };
};

export { NameIsEmpty };