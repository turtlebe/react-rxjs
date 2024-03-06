import { OrderWorkflowAction } from 'api/types';

const dataRequiredForAction = {
  UploadOrder: [],
  SendOrderConfirmation: [
    'orderDetails.customerInformation.customerOrderNumber',
    'orderDetails.customerInformation.customerCompany',
    'orderDetails.customerInformation.contacts.dispositionContact.contactDetails.email',
    'orderDetails.loadDetails.loadingTimeAndPlace.timeWindow',
    'orderDetails.loadDetails.loadingTimeAndPlace.venue',
    'orderDetails.loadDetails.unloadingTimeAndPlace.timeWindow',
    'orderDetails.loadDetails.unloadingTimeAndPlace.venue',
    'orderDetails.loadDetails.loadDescription',
    'orderDetails.serviceAgreementDetails.paymentTermDays',
    'orderDetails.serviceAgreementDetails.vatRate',
    'orderDetails.serviceAgreementDetails.services',
  ],
  UploadProofOfDelivery: [],
  SendInvoice: [
    'orderDetails.customerInformation.customerOrderNumber',
    'orderDetails.customerInformation.customerCompany',
    'orderDetails.customerInformation.contacts.bookkeepingContact.contactDetails.email',
    'orderDetails.loadDetails.loadingTimeAndPlace.timeWindow',
    'orderDetails.loadDetails.loadingTimeAndPlace.venue',
    'orderDetails.loadDetails.unloadingTimeAndPlace.timeWindow',
    'orderDetails.loadDetails.unloadingTimeAndPlace.venue',
    'orderDetails.loadDetails.loadDescription',
    'orderDetails.serviceAgreementDetails.paymentTermDays',
    'orderDetails.serviceAgreementDetails.vatRate',
    'orderDetails.serviceAgreementDetails.services',
  ],
  SendProofOfDelivery: [],
  UploadCreditNote: [],
  RecordPayment: [],
  FactorOrder: [],
  DeleteOrder: [],
  ShareWithDriver: [
    'orderDetails.loadDetails.loadingTimeAndPlace.timeWindow',
    'orderDetails.loadDetails.loadingTimeAndPlace.venue',
    'orderDetails.loadDetails.unloadingTimeAndPlace.timeWindow',
    'orderDetails.loadDetails.unloadingTimeAndPlace.venue',
    'orderDetails.loadDetails.loadDescription',
  ],
};

const contactData = [
  'orderDetails.customerInformation.contacts.dispositionContact.contactDetails.email',
  'orderDetails.customerInformation.contacts.bookkeepingContact.contactDetails.email',
];

const dataNameMapping: { [key: string]: string } = {
  'orderDetails.customerInformation.customerOrderNumber': 'customerOrderNumber',
  'orderDetails.customerInformation.customerCompany': 'customerCompany',
  'orderDetails.customerInformation.contacts.dispositionContact.contactDetails.email':
    'dispositionContact',
  'orderDetails.customerInformation.contacts.bookkeepingContact.contactDetails.email':
    'bookkeepingContact',
  'orderDetails.loadDetails.loadingTimeAndPlace.timeWindow': 'loadingTime',
  'orderDetails.loadDetails.loadingTimeAndPlace.venue': 'loadingPlace',
  'orderDetails.loadDetails.unloadingTimeAndPlace.timeWindow': 'unloadingTime',
  'orderDetails.loadDetails.unloadingTimeAndPlace.venue': 'unloadingPlace',
  'orderDetails.loadDetails.loadDescription': 'loadDescription',
  'orderDetails.serviceAgreementDetails.paymentTermDays': 'paymentTermDays',
  'orderDetails.serviceAgreementDetails.vatRate': 'vatRate',
  'orderDetails.serviceAgreementDetails.services': 'services',
};

export const useCheckOrderActionData = (action: OrderWorkflowAction, order: any) => {
  const requiredData = dataRequiredForAction[action];
  const missingDataLong: string[] = [];
  const missingData: string[] = [];
  requiredData.forEach((dataPoint) => {
    try {
      if (!dataPoint.split('.').reduce((o, i) => o[i], order)) {
        missingDataLong.push(dataPoint);
      }
    } catch (err) {
      missingDataLong.push(dataPoint);
    }
  });
  const isDataMissing = missingDataLong.length !== 0;
  const sendTo = isDataMissing
    ? missingDataLong.some((item) => contactData.includes(item))
      ? 'customerContactEntry'
      : 'orderDetailsEntry'
    : '';
  if (isDataMissing) {
    missingDataLong.forEach((missingDataPoint) => {
      missingData.push(dataNameMapping[missingDataPoint]);
    });
  }
  return { isDataMissing, missingData, sendTo };
};
