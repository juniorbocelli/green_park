import { PDFDocument } from 'pdf-lib';

import {
  GetPdfPagesException,
  GetIndividualPdfPageException
} from '../exceptions/PdfManagerExceptions';

class PdfManager {
  private pdfBuffer: Buffer;

  constructor(pdfBuffer: Buffer) {
    this.pdfBuffer = pdfBuffer;
  };

  private async getPdfDocument() {
    const pdfDoc = await PDFDocument.load(this.pdfBuffer);

    return pdfDoc;
  };

  public async getNumberOfPages(): Promise<number | undefined> {
    try {
      const pdfDoc = await this.getPdfDocument();
      const pagesOfPages = pdfDoc.getPages();

      return pagesOfPages.length;
    } catch (error: any) {
      throw new GetPdfPagesException(error.message)
    };
  };

  public async getPageBufferByIndex(index: number): Promise<Uint8Array | undefined> {
    try {
      const pdfDoc = await this.getPdfDocument();

      // Create a new "sub" document
      const subDocument = await PDFDocument.create();

      // copy the page at current index
      const [copiedPage] = await subDocument.copyPages(pdfDoc, [index]);

      // Add page in new document
      subDocument.addPage(copiedPage);

      const pdfBytes = await subDocument.save();

      return pdfBytes;
    } catch (error: any) {
      new GetIndividualPdfPageException(index, error.message);
    };
  };
};

export default PdfManager;