class ProhibitedFileExtensionException extends Error {
  constructor(acceptedExtensions: string[], acceptedMimeTypes: string[]) {
    super(`Extensões permitidas: ${acceptedExtensions.join(', ')}\nMimeTypes permitidos: ${acceptedMimeTypes.join(' ')}`);
  };
};

export {
  ProhibitedFileExtensionException,
};