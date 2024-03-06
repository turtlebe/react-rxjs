import { useMemo } from 'react';
import { object, string } from 'yup';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  documentRequired: t('Please upload a document'),
});

export const useUploadCreditNoteDocsFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        creditNoteUploadId: string().required(translations.documentRequired),
        proofOfDeliveryUploadId: string().required(translations.documentRequired),
      }),
    [translations]
  );

  return schema;
};
