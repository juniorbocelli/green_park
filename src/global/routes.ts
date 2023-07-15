export const API_ROOT = `/api`;

// Invoice
export const API_INVOICE_CREATE_FROM_CSV = `${API_ROOT}/invoice/upload_csv`;    // POST
export const API_INVOICE_SAVE_PDF_INVOICES = `${API_ROOT}/invoice/upload_pdf`;  // POST
export const API_INVOICE_FIND_ALL = `${API_ROOT}/invoice`;  // GET
export const API_INVOICE_REPORT = `${API_ROOT}/invoice/report`; // GET