import { useMemo } from 'react';
import { object, string } from 'yup';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  logoFileRequired: t('Please upload a logo'),
});

export const useUploadLogoFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        creditNoteUploadId: string().required(translations.logoFileRequired),
      }),
    [translations]
  );

  return schema;
};
