import Invoice from '../models/entities/Invoice';
import MaskApply from '../utils/MaskApply';
import * as HtmlParts from './htmlParts';

class GenerateReportHtml {
  private html: string = "";
  private invoices: Invoice[];

  private constructor(invoices: Invoice[]) {
    this.invoices = invoices;
  };

  public static getReportHtml(invoices: Invoice[]): string {
    const report = new GenerateReportHtml(invoices);

    report.startDocument();
    report.addCss();
    report.startTable();
    report.insertRows();
    report.endTable();
    report.endDocument();

    return report.html;
  };

  private startDocument() {
    this.html = this.html.concat(HtmlParts.startDocument);
  };

  private addCss() {
    this.html = this.html.replace('{{css}}', HtmlParts.css);
  };

  private endDocument() {
    this.html = this.html.concat(HtmlParts.endDocument);
  };

  private startTable() {
    this.html = this.html.concat(HtmlParts.startTable);
  };

  private endTable() {
    this.html = this.html.concat(HtmlParts.endTable);
  };

  private insertRows() {
    this.invoices.forEach(invoice => {
      const newRow = HtmlParts.newTableRow
        .replace('{{id}}', String(invoice.id))
        .replace('{{payerName}}', invoice.payerName)
        .replace('{{idLot}}', String(invoice.lot.id))
        .replace('{{name}}', invoice.lot.name)
        .replace('{{value}}', MaskApply.maskMoney(invoice.value))
        .replace('{{customText}}', String(invoice.customText));

      this.html = this.html.concat(newRow);
    });
  };
};

export default GenerateReportHtml;