import { ClearingSystem } from 'api/types';

export interface PaymentDetailsFormValues {
  amount: number | null;
  clearingSystem: ClearingSystem;
  country: string;
  deliveryDate: Date | null;
  invoiceOrCreditNoteDate: Date | null;
  invoiceOrCreditNoteNumber: string;
  paymentTerm: number | null;
}
