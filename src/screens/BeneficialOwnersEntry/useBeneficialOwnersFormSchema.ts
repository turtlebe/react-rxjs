import { useMemo } from 'react';
import { object, array } from 'yup';
import { useCommonSchemas } from '../shared/FormFields/validation-schema';

export const useBenficialOwnersFormSchema = () => {
  const {
    citySchema,
    countrySchema,
    dobSchema,
    firstNameSchema,
    lastNameSchema,
    nationalitySchema,
    placeOfBirthSchema,
    postcodeSchema,
    streetAndNumberSchema,
  } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        beneficialOwners: array().of(
          object({
            firstName: firstNameSchema,
            lastName: lastNameSchema,
            dob: dobSchema,
            placeOfBirth: placeOfBirthSchema,
            nationality: nationalitySchema,
            streetAndNumber: streetAndNumberSchema,
            postcode: postcodeSchema,
            city: citySchema,
            country: countrySchema,
          })
        ),
      }),
    [
      citySchema,
      countrySchema,
      dobSchema,
      firstNameSchema,
      lastNameSchema,
      nationalitySchema,
      placeOfBirthSchema,
      postcodeSchema,
      streetAndNumberSchema,
    ]
  );

  return schema;
};
