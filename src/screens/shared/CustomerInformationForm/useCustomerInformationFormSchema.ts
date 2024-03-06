import { useMemo } from 'react';
import { boolean, object } from 'yup';
import { useCommonSchemas } from 'screens/shared/FormFields/validation-schema';

export const useCustomerInformationFormSchema = () => {
  const {
    addressAddonSchema,
    citySchema,
    commercialRegisterNumberSchema,
    companyNameSchema,
    countrySchema,
    legalFormSchema,
    postcodeSchema,
    registrationAuthoritySchema,
    streetAndNumberSchema,
    vatIdSchema,
  } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        addressAddon: addressAddonSchema,
        city: citySchema,
        commercialRegisterNumber: commercialRegisterNumberSchema,
        commercialRegisterNumberRequired: boolean(),
        companyName: companyNameSchema,
        country: countrySchema,
        legalForm: legalFormSchema,
        postcode: postcodeSchema,
        registrationAuthority: registrationAuthoritySchema,
        streetAndNumber: streetAndNumberSchema,
        vatId: vatIdSchema,
      }),
    [
      addressAddonSchema,
      citySchema,
      commercialRegisterNumberSchema,
      companyNameSchema,
      countrySchema,
      legalFormSchema,
      postcodeSchema,
      registrationAuthoritySchema,
      streetAndNumberSchema,
      vatIdSchema,
    ]
  );

  return schema;
};
