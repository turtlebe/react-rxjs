import { useMemo } from 'react';
import { css } from '@emotion/react';
import { Typography } from 'components/Typography';
import { PaymentRequestStatus } from 'api/types';
import { TranslateFn, useTranslatedText } from './useTranslatedText';

export const phrases = (t: TranslateFn) => ({
  processingStatus: t(
    'Your payment request is being reviewed, this should typically not take longer than 24 hours.'
  ),
  requestAcceptedStatus: t(
    "The money should be on your bank account within 24 hours. If you don't receive the payment or if you have questions about the transaction, please"
  ),
  paidStatus: t(
    "The money has been transferred to your account. If you didn't receive the payment or if you have questions about the transaction, please"
  ),
  settledStatus: t(
    'The transaction is fully completed. You have received the money from Walbing and your customer has paid Walbing.'
  ),
  settlementOverdueStatus: t(
    'Your customer has not paid the invoice in time. Our partner Walbing will be contacting your customer now.'
  ),
  inCollectionStatus: t(
    'Your customer is more than 35 days overdue on their payment and the settlement has been handed over to a collection service.'
  ),
  unpaidStatus: t(
    "Your customer hasn't paid the invoice and it was also not possible to collect the payment through a collection service."
  ),
  problemStatus1: t('There was a problem processing your request. Please'),
  problemStatus2: t('for more information.'),
  contactText: t('contact truckOS'),
});

const contactStyle = css({
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const usePaymentStatusDescription = (
  status: PaymentRequestStatus,
  onContactClick: () => void
) => {
  const translations = useTranslatedText(phrases);

  const contactText = useMemo(
    () => (
      <Typography component="span" css={contactStyle} onClick={onContactClick}>
        {translations.contactText}
      </Typography>
    ),
    [onContactClick, translations]
  );

  const problemDescription = useMemo(
    () => (
      <Typography css={(theme) => ({ color: theme.palette.error.main })}>
        {translations.problemStatus1} {contactText} {translations.problemStatus2}
      </Typography>
    ),
    [contactText, translations]
  );

  switch (status) {
    case 'SETTLEMENT_OVERDUE':
      return (
        <Typography css={(theme) => ({ color: theme.palette.error.main })}>
          {translations.settlementOverdueStatus}
        </Typography>
      );
    case 'IN_COLLECTION':
      return (
        <Typography css={(theme) => ({ color: theme.palette.error.main })}>
          {translations.inCollectionStatus}
        </Typography>
      );
    case 'UNPAID_TO_BUYER':
      return (
        <Typography css={(theme) => ({ color: theme.palette.error.main })}>
          {translations.unpaidStatus}
        </Typography>
      );
    case 'DENIED':
    case 'UNKNOWN':
      return problemDescription;
    case 'SUBMITTED':
      return translations.processingStatus;
    case 'SOLD':
      return (
        <Typography css={(theme) => ({ color: theme.palette.primary.main })}>
          {translations.requestAcceptedStatus} {contactText}.
        </Typography>
      );
    case 'SETTLED':
      return (
        <Typography css={(theme) => ({ color: theme.palette.primary.main })}>
          {translations.settledStatus}
        </Typography>
      );
    case 'PAID_TO_CARRIER':
      return (
        <Typography css={(theme) => ({ color: theme.palette.primary.main })}>
          {translations.paidStatus} {contactText}.
        </Typography>
      );
    default:
      return null;
  }
};
