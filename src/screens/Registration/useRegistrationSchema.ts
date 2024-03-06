import { useMemo } from 'react';
import { object } from 'yup';
import { useCommonSchemas } from '../shared/FormFields/validation-schema';

export const useRegistrationSchema = () => {
  const { firstNameSchema, languageSchema, lastNameSchema } = useCommonSchemas();

  return useMemo(
    () =>
      object({
        firstName: firstNameSchema,
        lastName: lastNameSchema,
        locale: languageSchema,
      }),
    [firstNameSchema, lastNameSchema, languageSchema]
  );
};
