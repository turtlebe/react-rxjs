import { useMemo } from 'react';
import { date, object } from 'yup';
import { endOfDay } from 'date-fns';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  paymentDateRequired: t('Please enter the payment date'),
  paymentDateInFuture: t('Payment date cannot be in the future'),
});

const today = endOfDay(new Date());

export const useRecordPaymentFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        paymentReceivedOn: date()
          .nullable()
          .required(translations.paymentDateRequired)
          .max(today, translations.paymentDateInFuture),
      }),
    [translations]
  );

  return schema;
};
