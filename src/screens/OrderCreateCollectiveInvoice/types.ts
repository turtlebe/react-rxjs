export interface CreateCollectiveInvoiceFormValues {
  bookkeepingContact: string;
  customerName: string;
  invoiceNumber: string;
  paymentTerms: string;
  selectedOrders: string[];
  vatRate: string;
}

export interface CollectiveInvoiceOrder {
  customerId: string;
  customerName: string;
  deliveryDate: string;
  from: string;
  missingData: string[];
  orderNumber: string;
  to: string;
}
