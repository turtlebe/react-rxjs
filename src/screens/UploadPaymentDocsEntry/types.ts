import { ClearingSystem } from 'api/types';

export interface UploadPaymentDocsFormValues {
  clearingSystem?: ClearingSystem;
  confirmInvoiceHasIban: boolean;
  creditNoteFilename: string;
  creditNoteUploadId: string;
  invoiceFilename: string;
  invoiceUploadId: string;
  proofOfDeliveryFilename: string;
  proofOfDeliveryUploadId: string;
}
