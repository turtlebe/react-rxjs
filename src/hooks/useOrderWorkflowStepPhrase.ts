import { OrderWorkflowStep, OrderWorkflowAction } from 'api/types';
import { TranslateFn, useTranslatedText } from './useTranslatedText';

export const phrases = (t: TranslateFn) => ({
  // Step Names
  OrderUploaded: t('Order uploaded:'),
  OrderConfirmation: t('Order confirmed:'),
  PODUploaded: t('Order completed:'),
  PODSent: t('POD sent:'),
  InvoiceSent: t('Invoice sent:'),
  CreditNoteReceived: t('Credit note received:'),
  PaymentReceived: t('Payment received:'),
  SentToCollections: t('In collection:'),
  WrittenOff: t('Written off:'),
  openValue: t('Open'),
  translationMissing: t('Translation missing'),
  // Step Actions
  UploadOrder: t('Upload transport order now'),
  SendOrderConfirmation: t('Create order confirmation now'),
  UploadProofOfDelivery: t('Upload POD now'),
  SendInvoice: t('Create invoice now'),
  SendProofOfDelivery: t('Send POD now'),
  UploadCreditNote: t('Upload credit note now'),
  RecordPayment: t('Record receipt of payment'),
  FactorOrder: t('Factor now'),
  DeleteOrder: t('Delete now'),
  ShareWithDriver: t('Share now'),
  // Step Actions Verbose
  UploadOrderVerbose: t('Upload transport order'),
  SendOrderConfirmationVerbose: t('Create order confirmation'),
  UploadProofOfDeliveryVerbose: t('Upload proof of delivery'),
  SendInvoiceVerbose: t('Create invoice'),
  SendProofOfDeliveryVerbose: t('Send proof of delivery'),
  UploadCreditNoteVerbose: t('Upload credit note'),
  RecordPaymentVerbose: t('Record receipt of payment'),
  FactorOrderVerbose: t('Factor order'),
  DeleteOrderVerbose: t('Delete order'),
  ShareWithDriverVerbose: t('Share order with driver'),
  // Step Actions Missing Data Body Text
  SendOrderConfirmationMissingData: t(
    'To be able to create an order confirmation, we are missing the following infos:'
  ),
  UploadProofOfDeliveryMissingData: t(
    'To be able to upload the POD, we are missing the following infos:'
  ),
  SendInvoiceMissingData: t('To be able to create an invoice, we are missing the following infos:'),
  SendProofOfDeliveryMissingData: t(
    'To be able to send the POD, we are missing the following infos:'
  ),
  UploadCreditNoteMissingData: t(
    'To be able to upload the credit note, we are missing the following infos:'
  ),
  RecordPaymentMissingData: t(
    'To be able to record the payment, we are missing the following infos:'
  ),
  FactorOrderMissingData: t('To be able to factor the order, we are missing the following infos:'),
  DeleteOrderMissingData: t('To be able to delete the order, we are missing the following infos:'),
  ShareWithDriverMissingData: t(
    'To be able to share the order, we are missing the following infos:'
  ),
});

export const useOrderWorkflowStepNamePhrase = (step: OrderWorkflowStep) => {
  const translations = useTranslatedText(phrases);
  switch (step.stepName) {
    case 'OrderUploaded':
      return translations.OrderUploaded;
    case 'OrderConfirmation':
      return translations.OrderConfirmation;
    case 'PODUploaded':
      return translations.PODUploaded;
    case 'PODSent':
      return translations.PODSent;
    case 'InvoiceSent':
      return translations.InvoiceSent;
    case 'CreditNoteReceived':
      return translations.CreditNoteReceived;
    case 'PaymentReceived':
      return translations.PaymentReceived;
    case 'SentToCollections':
      return translations.SentToCollections;
    case 'WrittenOff':
      return translations.WrittenOff;
    default:
      return translations.translationMissing;
  }
};

export const useOrderWorkflowStepActionPhrase = (action: OrderWorkflowAction) => {
  const translations = useTranslatedText(phrases);
  switch (action) {
    case 'UploadOrder':
      return translations.UploadOrder;
    case 'SendOrderConfirmation':
      return translations.SendOrderConfirmation;
    case 'UploadProofOfDelivery':
      return translations.UploadProofOfDelivery;
    case 'SendInvoice':
      return translations.SendInvoice;
    case 'SendProofOfDelivery':
      return translations.SendProofOfDelivery;
    case 'UploadCreditNote':
      return translations.UploadCreditNote;
    case 'RecordPayment':
      return translations.RecordPayment;
    case 'FactorOrder':
      return translations.FactorOrder;
    case 'DeleteOrder':
      return translations.DeleteOrder;
    case 'ShareWithDriver':
      return translations.ShareWithDriver;
    default:
      return translations.openValue;
  }
};

export const useOrderWorkflowStepActionPhraseVerbose = (action: OrderWorkflowAction) => {
  const translations = useTranslatedText(phrases);
  switch (action) {
    case 'UploadOrder':
      return translations.UploadOrderVerbose;
    case 'SendOrderConfirmation':
      return translations.SendOrderConfirmationVerbose;
    case 'UploadProofOfDelivery':
      return translations.UploadProofOfDeliveryVerbose;
    case 'SendInvoice':
      return translations.SendInvoiceVerbose;
    case 'SendProofOfDelivery':
      return translations.SendProofOfDeliveryVerbose;
    case 'UploadCreditNote':
      return translations.UploadCreditNoteVerbose;
    case 'RecordPayment':
      return translations.RecordPaymentVerbose;
    case 'FactorOrder':
      return translations.FactorOrderVerbose;
    case 'DeleteOrder':
      return translations.DeleteOrderVerbose;
    case 'ShareWithDriver':
      return translations.ShareWithDriverVerbose;
    default:
      return translations.translationMissing;
  }
};

export const useOrderWorkflowStepActionDataMissingPhrase = (action: string) => {
  const translations = useTranslatedText(phrases);
  switch (action) {
    case 'SendOrderConfirmation':
      return translations.SendOrderConfirmationMissingData;
    case 'UploadProofOfDelivery':
      return translations.UploadProofOfDeliveryMissingData;
    case 'SendInvoice':
      return translations.SendInvoiceMissingData;
    case 'SendProofOfDelivery':
      return translations.SendProofOfDeliveryMissingData;
    case 'UploadCreditNote':
      return translations.UploadCreditNoteMissingData;
    case 'RecordPayment':
      return translations.RecordPaymentMissingData;
    case 'FactorOrder':
      return translations.FactorOrderMissingData;
    case 'DeleteOrder':
      return translations.DeleteOrderMissingData;
    case 'ShareWithDriver':
      return translations.ShareWithDriverMissingData;
    default:
      return translations.translationMissing;
  }
};
