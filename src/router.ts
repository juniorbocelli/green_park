import { Router } from 'express';

import * as Routes from './global/routes';
import ControllerInvoice from './controllers/ControllerInvoice';

const router = Router();
// Invoice
router.post(Routes.API_INVOICE_CREATE_FROM_CSV, ControllerInvoice.createFromCsv);
router.post(Routes.API_INVOICE_SAVE_PDF_INVOICES, ControllerInvoice.insertPdfFiles);
router.get(Routes.API_INVOICE_FIND_ALL, ControllerInvoice.findAll);
router.get(Routes.API_INVOICE_REPORT, ControllerInvoice.getReport);

export default router;