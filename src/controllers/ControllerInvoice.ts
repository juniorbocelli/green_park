import { Request, Response } from 'express';
import csv from 'csvtojson';
import { Readable } from 'stream';

import UCManagerInvoice from '../models/useCases/UCManagerInvoice';
import UCManagerLot from '../models/useCases/UCManagerLot';
import UCManagerWorkAround from '../models/useCases/UCManagerWorkAround';
import DAOInvoice from '../persistence/dao/DAOInvoice';
import DAOWorkAround from '../persistence/dao/DAOWorkAround';
import DAOLot from '../persistence/dao/DAOLot';
import FileUploadManager, { UploadedFile } from '../utils/FileUploadManager';
import FileManager from '../utils/FileManager';
import PdfManager from '../utils/PdfManager';
import {
  NoFileUploadedException,
  InvoiceNumbeNotEqualLotsNumberException,
  NotExistInvoicesInDatabaseException,
  AllInvoicesAlreadyHasPdfException,
  InvoiceNotExistException,
  GeneratePdfFileException,
} from '../exceptions/ControllerInvoiceExceptions';
import GenerateReportHtml from '../pdf/GenerateReportHtml';
import PDFGenerator from '../utils/PDFGenerator';

class ControllerInvoice {
  public static async createFromCsv(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoWorkAround = new DAOWorkAround();
    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoWorkAround);

    // Reveiving csv file
    const csvManager = new FileUploadManager(['.csv', '.CSV'], ['text/csv']);
    var receivedData: any | null = null;
    try {
      receivedData = await csvManager.handleArrayUploadFile(req, res);

    } catch (e: any) {
      throw new Error([e.message].join('\n'));
    };

    try {
      // Files object array
      const files: UploadedFile[] = receivedData.files;
      if (files.length === 0)
        throw new NoFileUploadedException();

      // Csv file
      const csvFile = files[0];

      // TODO: Verify keys of head
      const csvToJson = await csv({ delimiter: ';' }).fromStream(Readable.from(csvFile.buffer));

      const invoices = await ucManagerInvoice.createByDemand(csvToJson);

      res.status(200).json({ invoices });
    } catch (error: any) {
      console.error(`Ocorreu um erro: ${error.message}`);

      res.status(200).json({ error: error.message });
    };
  };

  public static async findAll(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoWorkAround = new DAOWorkAround();
    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoWorkAround);

    const {
      name,
      initial_value,
      final_value,
      id_lot
    } = req.query;

    try {
      const invoices = await ucManagerInvoice.findAll({
        name: name as string,
        initial_value: initial_value as string,
        final_value: final_value as string,
        id_lot: id_lot as string
      });

      res.status(200).json({ invoices });
    } catch (error: any) {
      console.error(`Ocorreu um erro: ${error.message}`);

      res.status(200).json({ error: error.message });
    };
  };

  public static async insertPdfFiles(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoWorkAround = new DAOWorkAround();
    const daoLot = new DAOLot();
    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoWorkAround);
    const ucManagerLot = new UCManagerLot(daoLot, daoWorkAround);
    const ucManagerWorkAround = new UCManagerWorkAround(daoWorkAround);

    try {
      // Reveiving pdf file
      const fileManager = new FileUploadManager(['.pdf', '.PDF'], ['application/pdf']);
      var receivedData: any | null = null;
      receivedData = await fileManager.handleArrayUploadFile(req, res);
      // Files object array
      const files: UploadedFile[] = receivedData.files;
      if (files.length === 0)
        throw new NoFileUploadedException();

      // Pdf file
      const pdfFile = files[0];

      const pdfManager = new PdfManager(pdfFile.buffer);

      // Number of pages in PDF
      const numberOfPages = await pdfManager.getNumberOfPages();

      // Number of saved PDFs
      const numberOfSavedPDf = FileManager.countPdfFilesInFolder();

      // Number of lots
      const numberOfLots = await ucManagerLot.selectCount();
      // Number of invoices in database
      const numberOfInvoices = await ucManagerInvoice.selectCount();

      if (numberOfLots !== numberOfPages)
        throw new InvoiceNumbeNotEqualLotsNumberException(numberOfPages!, numberOfLots);


      if (numberOfInvoices === 0)
        throw new NotExistInvoicesInDatabaseException();


      if (numberOfSavedPDf === numberOfInvoices)
        throw new AllInvoicesAlreadyHasPdfException();

      for (let i = numberOfSavedPDf; i < numberOfPages + numberOfSavedPDf; i++) {
        const invoice = await ucManagerInvoice.findByPk(i + 1);
        if (invoice === null)
          throw new InvoiceNotExistException(i + 1);

        const workAround = await ucManagerWorkAround.findByLotId(invoice.lot.id!);
        const pageOfPdf = await pdfManager.getPageBufferByIndex(workAround!.invoiceOrder);

        await FileManager.writePdfFromBuffer(pageOfPdf!, `${i + 1}`);
      };

      res.status(200).json({});
    } catch (error: any) {
      console.error(`Ocorreu um erro: ${error.message}`);

      res.status(200).json({ error: error.message });
    };
  };

  public static async getReport(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoWorkAround = new DAOWorkAround();
    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoWorkAround);

    const {
      report,
    } = req.query;

    try {
      const invoices = await ucManagerInvoice.findAllByReport(typeof report === 'undefined' ? 0 : Number(report));
      const reportHtml = GenerateReportHtml.getReportHtml(invoices);

      const pdfBuffer = await PDFGenerator.getPDF(reportHtml);

      if (pdfBuffer === null)
        throw new GeneratePdfFileException();

      res.set("Content-Type", "application/pdf");
      res.status(200).send(pdfBuffer);
    } catch (error: any) {
      console.error(`Ocorreu um erro: ${error.message}`);

      res.status(200).json({ error: error.message });
    };
  };
};

export default ControllerInvoice;