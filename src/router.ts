import { Router } from 'express';

// import Auth from './middlewares/Auth';
// import Permissions from './middlewares/Permissions';

// import UserController from './controllers/UserController';
// import SkuStockController from './controllers/SkuStockController';
// import SkuStartingController from './controllers/SkuStartingController';
// import ClientController from './controllers/ClientController';
// import StockReportController from './controllers/StockReportController';
// import SubmissionController from './controllers/SubmissionController';
// import SubmissionEmailController from './controllers/SubmissionEmailController';
// import RecurrentSubmissionController from './controllers/RecurrentSubmissionController';

// import * as Routes from './globals/routes';

const router = Router();
// router.post(Routes.API_USER_LOGIN, UserController.login);
// router.patch(Routes.API_USER_LOGOUT, UserController.logout);
// router.get(Routes.API_USER_GET_LOGGED, UserController.getLooged);
// router.patch(Routes.API_USER_CAHNGE_PASSWORD, UserController.changePassword);

// // User
// router.get(Routes.API_USER_SELECT_ALL, Auth.tokenVerify, Permissions.checkPermission, UserController.selectAll);
// router.get(Routes.API_USER_SELECT, Auth.tokenVerify, Permissions.checkPermission, UserController.select);
// router.post(Routes.API_USER_CREATE, Auth.tokenVerify, Permissions.checkPermission, UserController.create);
// router.put(Routes.API_USER_UPDATE, Auth.tokenVerify, Permissions.checkPermission, UserController.update);
// router.delete(Routes.API_USER_DELETE, Auth.tokenVerify, Permissions.checkPermission, UserController.delete);

// // Sku Stock
// router.get(Routes.API_SKU_STOCK_SELECT_ALL, Auth.tokenVerify, SkuStockController.selectAll);
// router.get(Routes.API_SKU_STOCK_SELECT_ALL_LESS_IMAGES, Auth.tokenVerify, SkuStockController.selectAllLessImage);
// router.get(Routes.API_SKU_STOCK_SELECT_UNIQUE_FIELDS, Auth.tokenVerify, SkuStockController.selectUniqueFields);
// router.post(Routes.API_SKU_STOCK_SELECT_FILTER, Auth.tokenVerify, SkuStockController.selectFilter);
// router.get(Routes.API_SKU_STOCK_SELECT_FILTERS_FROM_FAMILIES, Auth.tokenVerify, SkuStockController.selectFiltersFromFamilies);
// router.get(Routes.API_SKU_STOCK_SELECT, Auth.tokenVerify, SkuStockController.select);

// // Sku Starting
// router.get(Routes.API_SKU_STARTING_SELECT_ALL, Auth.tokenVerify, SkuStartingController.selectAll);
// router.get(Routes.API_SKU_STARTING_SELECT, Auth.tokenVerify, SkuStartingController.select);

// // Client
// router.get(Routes.API_CLIENT_SELECT_ALL, Auth.tokenVerify, ClientController.selectAll);
// router.get(Routes.API_CLIENT_SELECT_FROM_USER, Auth.tokenVerify, ClientController.selectFromUser);
// router.get(Routes.API_CLIENT_SELECT, Auth.tokenVerify, ClientController.select);

// // Report
// router.post(Routes.API_REPORT_GET_PDF_EXAMPLE, Auth.tokenVerify, StockReportController.getPdfFromFilter);
// router.post(Routes.API_REPORT_CREATE, Auth.tokenVerify, StockReportController.create);
// router.put(Routes.API_REPORT_UPDATE, Auth.tokenVerify, StockReportController.update);
// router.get(Routes.API_REPORT_SELECT_ALL, Auth.tokenVerify, StockReportController.selectAll);
// router.patch(Routes.API_REPORT_PDF_GENERATE, Auth.tokenVerify, StockReportController.generateNewPdf);
// router.get(Routes.API_REPORT_SELECT, Auth.tokenVerify, StockReportController.select);
// router.get(Routes.API_REPORT_GET_PDF_FROM_ID, StockReportController.getPdfFromId);
// router.get(Routes.API_REPORT_GET_PDF_FROM_FILENAME, StockReportController.getPdfFromFilename);
// router.patch(Routes.API_REPORT_SET_AS_INACTIVE, StockReportController.setAsInactive);

// // Submission
// router.post(Routes.API_SUBMISSION_CREATE, Auth.tokenVerify, SubmissionController.create);
// router.get(Routes.API_SUBMISSION_SELECT_ALL, Auth.tokenVerify, SubmissionController.selectAll);
// router.get(Routes.API_SUBMISSION_SELECT, Auth.tokenVerify, SubmissionController.select);

// // Submission E-mail
// router.get(Routes.API_SUBMISSION_EMAIL_SELECT_ALL, Auth.tokenVerify, SubmissionEmailController.selectAll);
// router.get(Routes.API_SUBMISSION_EMAIL_SELECT, Auth.tokenVerify, SubmissionEmailController.select);
// router.get(Routes.API_SUBMISSION_EMAIL_DOWNLOAD_PDF, SubmissionEmailController.getPdfFile);
// router.get(Routes.API_SUBMISSION_EMAIL_ADD_OPENED, SubmissionEmailController.addOpenedEmail);

// // Recurrent Submission
// router.post(Routes.API_RECURRENT_SUBMISSION_CREATE, Auth.tokenVerify, RecurrentSubmissionController.create);
// router.put(Routes.API_RECURRENT_SUBMISSION_UPDATE, Auth.tokenVerify, RecurrentSubmissionController.update);
// router.get(Routes.API_RECURRENT_SUBMISSION_SELECT_ALL, Auth.tokenVerify, RecurrentSubmissionController.selectAll);
// router.get(Routes.API_RECURRENT_SUBMISSION_SELECT, Auth.tokenVerify, RecurrentSubmissionController.select);

export default router;