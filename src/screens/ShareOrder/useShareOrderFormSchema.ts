import { useMemo } from 'react';
import { object } from 'yup';
import { useCommonSchemas } from 'screens/shared/FormFields/validation-schema';

export const useShareOrderFormSchema = () => {
  const { emailSchema } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        email: emailSchema,
      }),
    [emailSchema]
  );

  return schema;
};
