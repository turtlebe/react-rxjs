import { CountryCode } from 'ref-data/countries';

export interface BusinessDataFormValues {
  addressAddon: string;
  businessLicenseFileRequired: boolean;
  businessLicenseFilename: string;
  businessLicenseUploadId: string;
  city: string;
  commercialRegisterNumber: string;
  commercialRegisterNumberRequired: boolean;
  companyName: string;
  country: CountryCode;
  legalForm: string;
  phoneNumber: string;
  postcode: string;
  registrationAuthority: string;
  streetAndNumber: string;
  vatId: string;
}
