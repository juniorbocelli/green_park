class BrowserNotSettedException extends Error {
  constructor() {
    super("Puppeteer: o browse não foi setado");
  };
};

class PageNotSettedException extends Error {
  constructor() {
    super("Puppeteer: o página não foi setada");
  };
};

export {
  BrowserNotSettedException,
  PageNotSettedException,
};