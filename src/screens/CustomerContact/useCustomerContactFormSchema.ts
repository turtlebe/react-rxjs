import { useMemo } from 'react';
import { object } from 'yup';
import { useCommonSchemas } from 'screens/shared/FormFields/validation-schema';

export const useCustomerContactFormSchema = () => {
  const { contactNameSchema, emailSchema, phoneNumberSchema } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        contactName: contactNameSchema,
        email: emailSchema,
        phoneNumber: phoneNumberSchema,
      }),
    [contactNameSchema, emailSchema, phoneNumberSchema]
  );

  return schema;
};
