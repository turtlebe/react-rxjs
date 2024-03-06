import { useMemo } from 'react';
import { boolean, object } from 'yup';
import { useCommonSchemas } from '../shared/FormFields/validation-schema';

export const useBusinessDataFormSchema = () => {
  const {
    addressAddonSchema,
    businessLicenseUploadIdSchema,
    citySchema,
    commercialRegisterNumberSchema,
    companyNameSchema,
    countrySchema,
    legalFormSchema,
    phoneNumberSchema,
    postcodeSchema,
    registrationAuthoritySchema,
    streetAndNumberSchema,
    vatIdSchema,
  } = useCommonSchemas();

  const schema = useMemo(
    () =>
      object({
        addressAddon: addressAddonSchema,
        businessLicenseFileRequired: boolean(),
        businessLicenseUploadId: businessLicenseUploadIdSchema,
        city: citySchema,
        commercialRegisterNumber: commercialRegisterNumberSchema,
        commercialRegisterNumberRequired: boolean(),
        companyName: companyNameSchema,
        country: countrySchema,
        legalForm: legalFormSchema,
        phoneNumber: phoneNumberSchema,
        postcode: postcodeSchema,
        registrationAuthority: registrationAuthoritySchema,
        streetAndNumber: streetAndNumberSchema,
        vatId: vatIdSchema,
      }),
    [
      addressAddonSchema,
      businessLicenseUploadIdSchema,
      citySchema,
      commercialRegisterNumberSchema,
      companyNameSchema,
      countrySchema,
      legalFormSchema,
      phoneNumberSchema,
      postcodeSchema,
      registrationAuthoritySchema,
      streetAndNumberSchema,
      vatIdSchema,
    ]
  );

  return schema;
};
