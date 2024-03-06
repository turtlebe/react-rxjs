import { useMemo } from 'react';
import { boolean, object } from 'yup';
import { useCommonSchemas } from '../shared/FormFields/validation-schema';

export const useKycLightFormSchema = () => {
  const {
    bicSchema,
    citySchema,
    commercialRegisterNumberSchema,
    companyNameSchema,
    countrySchema,
    emailSchema,
    ibanSchema,
    legalFormSchema,
    phoneNumberSchema,
    postcodeSchema,
    streetAndNumberSchema,
    taxIdSchema,
    vatIdSchema,
  } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        bic: bicSchema,
        city: citySchema,
        commercialRegisterNumber: commercialRegisterNumberSchema,
        commercialRegisterNumberRequired: boolean(),
        companyName: companyNameSchema,
        country: countrySchema,
        iban: ibanSchema,
        legalForm: legalFormSchema,
        phoneNumber: phoneNumberSchema,
        email: emailSchema,
        postcode: postcodeSchema,
        streetAndNumber: streetAndNumberSchema,
        vatId: vatIdSchema,
        taxId: taxIdSchema,
      }),
    [
      bicSchema,
      citySchema,
      commercialRegisterNumberSchema,
      companyNameSchema,
      countrySchema,
      emailSchema,
      ibanSchema,
      legalFormSchema,
      phoneNumberSchema,
      postcodeSchema,
      streetAndNumberSchema,
      vatIdSchema,
      taxIdSchema,
    ]
  );

  return schema;
};
