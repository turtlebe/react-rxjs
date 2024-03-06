import { useMemo } from 'react';
import { object, string } from 'yup';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  invoiceNumberRequired: t('Please enter an invoice number'),
});

export const useOrderCreateInvoiceFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        invoiceNumber: string().required(translations.invoiceNumberRequired),
      }),
    [translations]
  );

  return schema;
};
