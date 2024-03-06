import { useMemo } from 'react';
import { object, string } from 'yup';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  documentRequired: t('Please upload a document'),
});

export const useOrderUploadOrderFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        orderUploadId: string().required(translations.documentRequired),
      }),
    [translations]
  );

  return schema;
};
