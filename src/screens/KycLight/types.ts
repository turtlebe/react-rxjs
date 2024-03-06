import { CountryCode } from 'ref-data/countries';

export interface KycLightFormValues {
  bic: string;
  city: string;
  companyName: string;
  country: CountryCode;
  email: string;
  iban: string;
  legalForm: string;
  phoneNumber: string;
  postcode: string;
  streetAndNumber: string;
  taxId: string;
  vatId: string;
}
