import { useMemo } from 'react';
import { object } from 'yup';
import { useCommonSchemas } from 'screens/shared/FormFields/validation-schema';
import { TranslateFn, useTranslatedText } from '../../hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  contactEmailRequired: t('Please enter a contact email'),
});
export const useCustomerContactFormSchema = () => {
  const { nullableEmailSchema, orderContactNameSchema, orderPhoneNumberSchema } =
    useCommonSchemas();
  const translations = useTranslatedText(phrases);

  return useMemo(
    () =>
      object({
        bookKeepingContactName: orderContactNameSchema,
        dispositionContactName: orderContactNameSchema,
        bookKeepingEmail: nullableEmailSchema.when('bookKeepingContactName', {
          is: (contactName: string) => !!contactName,
          then: (schema) => schema.required(translations.contactEmailRequired),
        }),
        dispositionEmail: nullableEmailSchema.when('dispositionContactName', {
          is: (contactName: string) => !!contactName,
          then: (schema) => schema.required(translations.contactEmailRequired),
        }),
        bookKeepingPhoneNumber: orderPhoneNumberSchema,
        dispositionPhoneNumber: orderPhoneNumberSchema,
      }),
    [orderContactNameSchema, nullableEmailSchema, orderPhoneNumberSchema, translations]
  );
};
