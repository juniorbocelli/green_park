import puppeteer, { Browser, Page } from 'puppeteer';

import {
  BrowserNotSettedException,
  PageNotSettedException,
} from '../exceptions/PDFGeneratorExceptions';

class PDFGenerator {
  private puppeteer = puppeteer;
  private browser: Browser | null = null;
  private page: Page | null = null;
  private pdfBuffer: Buffer | null = null;

  constructor() {

  };

  private async setBrowser() {
    this.browser = await this.puppeteer.launch({ devtools: false, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
  };

  private async setPage() {
    if (this.browser === null)
      throw new BrowserNotSettedException();

    this.page = await this.browser.newPage();
  };

  private async setPageContent(html: string) {
    if (this.page === null)
      throw new PageNotSettedException();

    await this.page.setContent(html);
  };

  private async setPdfBuffer() {
    if (this.page === null)
      throw new PageNotSettedException();

    this.pdfBuffer = await this.page.pdf();
  };

  private async pageClose() {
    if (this.page === null)
      throw new PageNotSettedException();

    await this.page.close();
  };

  private async browserClose() {
    if (this.browser === null)
      throw new BrowserNotSettedException();

    await this.browser.close();
  };

  public static async getPDF(html: string): Promise<Buffer | null> {
    const pdfGenerate = new PDFGenerator();

    try {
      await pdfGenerate.setBrowser();
      await pdfGenerate.setPage();
      await pdfGenerate.setPageContent(html);
      await pdfGenerate.setPdfBuffer();

      await pdfGenerate.pageClose();
      await pdfGenerate.browserClose();
    } catch (error: any) {
      throw new Error(error as string);

    };

    return pdfGenerate.pdfBuffer;
  };
};

export default PDFGenerator;