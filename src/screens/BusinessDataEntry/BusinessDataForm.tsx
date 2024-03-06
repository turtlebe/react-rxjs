import { memo } from 'react';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CountryCode } from 'ref-data/countries';
import {
  CompanyNameFormField,
  PhoneNumberFormField,
  LegalFormField,
  RegistrationAuthorityFormField,
  PostcodeFormField,
  StreetAndNumberFormField,
  AddressAddonFormField,
  CityFormField,
  CountryFormField,
  CommercialRegisterNumberFormField,
  VatIdFormField,
} from '../shared/FormFields';
import { FormComponentProps } from '../shared/types';
import { useBusinessDataFormSchema } from './useBusinessDataFormSchema';
import { BusinessDataFormValues } from './types';
import { UploadBusinessLicenseField } from './UploadBusinessLicenseField';

const phrases = (t: TranslateFn) => ({ nextLabel: t('Next') });

export interface BusinessDataFormProps extends FormComponentProps<BusinessDataFormValues> {}

export const DEFAULT_VALUES: BusinessDataFormValues = {
  addressAddon: '',
  city: '',
  commercialRegisterNumber: '',
  commercialRegisterNumberRequired: true,
  companyName: '',
  country: 'DE',
  legalForm: '',
  businessLicenseFilename: '',
  businessLicenseFileRequired: false,
  businessLicenseUploadId: '',
  phoneNumber: '',
  postcode: '',
  registrationAuthority: '',
  streetAndNumber: '',
  vatId: '',
};

const COUNTRIES: CountryCode[] = ['AT', 'CH', 'DE'];

export const BusinessDataForm = memo((props: BusinessDataFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useBusinessDataFormSchema();

  const api = useForm<BusinessDataFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const country = api.watch('country');

  return (
    <Form api={api} loading={loading} submitLabel={translations.nextLabel} onSubmit={onSubmit}>
      <CompanyNameFormField />
      <PostcodeFormField />
      <StreetAndNumberFormField />
      <AddressAddonFormField />
      <CityFormField />
      <CountryFormField onlyCountries={COUNTRIES} />
      <PhoneNumberFormField defaultCountry={country} onlyCountries={COUNTRIES} />
      <LegalFormField />
      <RegistrationAuthorityFormField />
      <CommercialRegisterNumberFormField />
      <VatIdFormField />
      <UploadBusinessLicenseField />
    </Form>
  );
});
