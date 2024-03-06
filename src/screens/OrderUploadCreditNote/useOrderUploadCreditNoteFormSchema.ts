import { useMemo } from 'react';
import { date, object, string } from 'yup';
import { endOfDay } from 'date-fns';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  documentRequired: t('Please upload a document'),
  creditNoteDateRequired: t('Please enter the credit note date'),
  creditNoteDateInFuture: t('Credit note date cannot be in the future'),
});

export const useUploadCreditNoteFormSchema = () => {
  const translations = useTranslatedText(phrases);
  const today = useMemo(() => endOfDay(new Date()), []);

  const schema = useMemo(
    () =>
      object({
        creditNoteUploadId: string().required(translations.documentRequired),
        creditNoteDate: date()
          .typeError(translations.creditNoteDateRequired)
          .required(translations.creditNoteDateRequired)
          .max(today, translations.creditNoteDateInFuture),
      }),
    [translations, today]
  );

  return schema;
};
