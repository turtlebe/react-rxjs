import { PaymentRequestDetail } from 'api/types';

export const MockPaymentRequest: PaymentRequestDetail = {
  requestId: 'request123',
  status: 'IN_COLLECTION',
  clearingSystem: 'invoice',
  invoiceOrCreditNoteNumber: '2022-238',
  deliveryDate: '2022-08-11T00:00:00.000Z',
  invoiceOrCreditNoteDate: '2022-10-11T00:00:00.000Z',
  amount: 1040,
  paymentTerm: 45,
  payoutDate: '2022-11-03T00:00:00.000Z',
  factoringFee: 0.015,
  payoutAmount: 1003.6,
  customerInformation: {
    companyId: 'company1',
    companyName: 'DB Schenker',
    streetAndNumber: 'Lyonder Str. 15',
    postcode: '60152',
    city: 'Frankfurt am Main',
  },
  customerContact: {
    contactId: 'contact1',
    contactName: 'Michaela Muller',
    email: 'm.mueller@dbschenker.de',
    phoneNumber: '+49089386523',
  },
  documents: [
    {
      name: 'invoice',
      filename: 'Invoice_Wolfrum_2022-283_for_factoring.pdf',
      uploadId: 'up123',
    },
    {
      name: 'proof_of_delivery',
      filename: 'POD_Wolfrum_2022-283_for_factoring.pdf',
      uploadId: 'up234',
    },
  ],
};
