import { PaymentRequestStatus } from 'api/types';
import { TranslateFn, useTranslatedText } from './useTranslatedText';

export const phrases = (t: TranslateFn) => ({
  processingStatus: t('Processing payment request'),
  requestAcceptedStatus: t('Payment request accepted'),
  paidStatus: t('Payment should be on your bank account'),
  settledStatus: t('Payment settled'),
  settlementOverdueStatus: t('Your customer is overdue on their payment'),
  inCollectionStatus: t('Your customer is more than 35 days overdue'),
  unpaidStatus: t('Your customer never paid'),
  paymentDeniedStatus: t('Payment denied'),
  unknownStatus: t('There was a problem - contact support'),
  draftStatus: t('Complete payment request now'),
});

export const usePaymentStatusPhrase = (status: PaymentRequestStatus) => {
  const translations = useTranslatedText(phrases);

  switch (status) {
    case 'SETTLEMENT_OVERDUE':
      return translations.settlementOverdueStatus;
    case 'IN_COLLECTION':
      return translations.inCollectionStatus;
    case 'UNPAID_TO_BUYER':
      return translations.unpaidStatus;
    case 'DENIED':
      return translations.paymentDeniedStatus;
    case 'UNKNOWN':
      return translations.unknownStatus;
    case 'SUBMITTED':
      return translations.processingStatus;
    case 'SOLD':
      return translations.requestAcceptedStatus;
    case 'SETTLED':
      return translations.settledStatus;
    case 'PAID_TO_CARRIER':
      return translations.paidStatus;
    default:
      return translations.draftStatus;
  }
};
