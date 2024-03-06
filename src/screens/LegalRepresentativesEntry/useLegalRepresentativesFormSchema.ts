import { useMemo } from 'react';
import { object, string, array } from 'yup';
import { PowerOfRepresentation } from 'api/types';
import { useCommonSchemas } from '../shared/FormFields/validation-schema';

export const useLegalRepresentativesFormSchema = () => {
  const { dobSchema, emailSchema, firstNameSchema, languageSchema, lastNameSchema } =
    useCommonSchemas();

  return useMemo(
    () =>
      object({
        areYouLegalRep: string(),
        powerOfRepresentation: string(),
        representatives: array()
          .of(
            object({
              firstName: firstNameSchema,
              lastName: lastNameSchema,
              email: emailSchema,
              dob: dobSchema,
              language: languageSchema,
            })
          )
          .when(
            'powerOfRepresentation',
            (powerOfRepresentation: PowerOfRepresentation, repSchema) =>
              powerOfRepresentation === 'sole' ? repSchema.min(1).max(1) : repSchema.min(2)
          ),
      }),
    [dobSchema, emailSchema, firstNameSchema, languageSchema, lastNameSchema]
  );
};
