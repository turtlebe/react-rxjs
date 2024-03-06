import { useMemo } from 'react';
import { object, string } from 'yup';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { booleanTrueSchema } from '../shared/FormFields/validation-schema';

const phrases = (t: TranslateFn) => ({
  confirmIbanRequired: t('Please confirm that your invoice includes the virtual IBAN'),
  documentRequired: t('Please upload a document'),
});

export const useUploadInvoiceDocsFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        confirmInvoiceHasIban: booleanTrueSchema(translations.confirmIbanRequired),
        invoiceUploadId: string().required(translations.documentRequired),
        proofOfDeliveryUploadId: string().required(translations.documentRequired),
      }),
    [translations]
  );

  return schema;
};
