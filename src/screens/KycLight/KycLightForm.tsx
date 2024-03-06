import { memo } from 'react';
import { Typography } from '@mui/material';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CountryCode } from 'ref-data/countries';
import {
  CompanyNameFormField,
  PhoneNumberFormField,
  LegalFormField,
  PostcodeFormField,
  StreetAndNumberFormField,
  CityFormField,
  CountryFormField,
  TaxIdFormField,
  VatIdFormField,
  IbanFormField,
  BicFormField,
  EmailFormField,
} from '../shared/FormFields';
import { FormComponentProps } from '../shared/types';
import { useKycLightFormSchema } from './useKycLightFormSchema';
import { KycLightFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  saveLabel: t('Save business data'),
  bankAccount: t('Bank account'),
  bankDisclaimer: t(
    'We need your bank account details so we can automatically generate invoices for you. We will of course not charge anything from this account.'
  ),
});

export interface KycLightFormProps extends FormComponentProps<KycLightFormValues> {}

export const DEFAULT_VALUES: KycLightFormValues = {
  companyName: '',
  country: 'DE',
  postcode: '',
  city: '',
  streetAndNumber: '',
  legalForm: '',
  phoneNumber: '',
  email: '',
  taxId: '',
  vatId: '',
  iban: '',
  bic: '',
};

const COUNTRIES: CountryCode[] = [
  'DE',
  'AT',
  'BE',
  'BG',
  'CH',
  'CY',
  'CZ',
  'DK',
  'EE',
  'ES',
  'FI',
  'IE',
  'IT',
  'LI',
  'LV',
  'LU',
  'MT',
  'NL',
  'PL',
  'RO',
  'SE',
];

export const KycLightForm = memo((props: KycLightFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useKycLightFormSchema();

  const api = useForm<KycLightFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const country = api.watch('country');

  return (
    <Form api={api} loading={loading} submitLabel={translations.saveLabel} onSubmit={onSubmit}>
      <CompanyNameFormField />
      <CountryFormField onlyCountries={COUNTRIES} />
      <PostcodeFormField />
      <CityFormField />
      <StreetAndNumberFormField />
      <LegalFormField />
      <PhoneNumberFormField defaultCountry={country} onlyCountries={COUNTRIES} />
      <EmailFormField />
      <TaxIdFormField />
      <VatIdFormField />
      <div css={(theme) => ({ paddingTop: theme.spacing(2.5) })}>
        <Typography css={(theme) => ({ paddingBottom: theme.spacing(1) })} variant="h2">
          {translations.bankAccount}
        </Typography>
        <Typography css={(theme) => ({ paddingBottom: theme.spacing(1.5) })} variant="body1">
          {translations.bankDisclaimer}
        </Typography>
        <IbanFormField />
        <BicFormField />
      </div>
    </Form>
  );
});
