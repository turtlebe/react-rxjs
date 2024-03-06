import { ClearingSystem, OrderStatus } from 'api/types';
import { TranslateFn, useTranslatedText } from './useTranslatedText';

export const phrases = (t: TranslateFn) => ({
  createdStatus: t('Order open'),
  deliveredStatusInvoice: t('Order completed | Invoice open'),
  deliveredStatusCreditNote: t('Order completed | POD open'),
  waitingForPaymentStatusInvoice: t('Order completed | Invoice sent'),
  waitingForPaymentStatusCreditNote: t('Order completed | POD sent'),
  paidStatus: t('Order completed | Payment received'),
  overdueStatus: t('Order completed | Payment overdue'),
  inCollectionStatus: t('Order completed | Payment in collection'),
  writeoffStatus: t('Your customer never paid'),
  unknownStatus: t('There was a problem - contact support'),
});

export const useOrderStatusPhrase = (
  status: OrderStatus,
  clearingSystem: ClearingSystem | undefined
) => {
  const translations = useTranslatedText(phrases);
  let deliveredStatus: string;
  let waitingForPaymentStatus: string;

  switch (status) {
    case 'CREATED':
      return translations.createdStatus;
    case 'DELIVERED':
      if (clearingSystem === 'invoice') {
        deliveredStatus = translations.deliveredStatusInvoice;
      } else {
        deliveredStatus = translations.deliveredStatusCreditNote;
      }
      return deliveredStatus;
    case 'WAITING_FOR_PAYMENT':
      if (clearingSystem === 'invoice') {
        waitingForPaymentStatus = translations.waitingForPaymentStatusInvoice;
      } else {
        waitingForPaymentStatus = translations.waitingForPaymentStatusCreditNote;
      }
      return waitingForPaymentStatus;
    case 'PAID':
      return translations.paidStatus;
    case 'OVERDUE':
      return translations.overdueStatus;
    case 'IN_COLLECTION':
      return translations.inCollectionStatus;
    case 'WRITEOFF':
      return translations.writeoffStatus;
    default:
      return translations.unknownStatus;
  }
};
