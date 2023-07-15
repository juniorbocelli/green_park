import { Request, Response } from 'express';
import csv from 'csvtojson';
import { Readable } from 'stream';

import UCManagerInvoice from '../models/useCases/UCManagerInvoice';
import DAOInvoice from '../persistence/dao/DAOInvoice';
import DAOWorkAround from '../persistence/dao/DAOWorkAround';
import CsvManager, { UploadedFile } from '../utils/CsvManager';
import { NoFileUploadedException } from '../exceptions/ControllerInvoiceExceptions';

class ControllerInvoice {
  public static async createFromCsv(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoWorkAround = new DAOWorkAround();
    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoWorkAround);

    // Reveiving csv file
    const csvManager = new CsvManager();
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

      console.log('csvFile', csvFile);

      const csvToJson = await csv({ delimiter: ';' }).fromStream(Readable.from(csvFile.buffer));

      const invoices = await ucManagerInvoice.createByDemand(csvToJson);

      res.status(200).json({ invoices });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ControllerInvoice;