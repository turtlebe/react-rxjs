import { useMemo } from 'react';
import { object } from 'yup';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useCommonSchemas, booleanTrueSchema } from '../shared/FormFields/validation-schema';

const phrases = (t: TranslateFn) => ({
  authorizationInvalidMessage: t('Please accept our terms and fees'),
});

export const useBankAccountFormSchema = () => {
  const translations = useTranslatedText(phrases);
  const { bicSchema, ibanSchema } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        iban: ibanSchema,
        bic: bicSchema,
        authorization: booleanTrueSchema(translations.authorizationInvalidMessage),
      }),
    [ibanSchema, bicSchema, translations]
  );

  return schema;
};
