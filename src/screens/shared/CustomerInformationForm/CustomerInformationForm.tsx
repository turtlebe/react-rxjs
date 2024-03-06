import { memo } from 'react';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  AddressAddonFormField,
  CityFormField,
  CommercialRegisterNumberFormField,
  CompanyIdFormField,
  CountryFormField,
  LegalFormField,
  PostcodeFormField,
  RegistrationAuthorityFormField,
  StreetAndNumberFormField,
  VatIdFormField,
} from 'screens/shared/FormFields';
import { FormComponentProps } from 'screens/shared/types';
import { CustomerInformationFormValues } from './types';
import { useCustomerInformationFormSchema } from './useCustomerInformationFormSchema';

const phrases = (t: TranslateFn) => ({
  nextLabel: t('Next'),
  emailLabel: t('Contact email (bookkeeping)'),
  phoneNumberLabel: t('Contact phone (bookkeeping)'),
});

const COUNTRY_QUERY = { forDebtor: true };

export interface CustomerInformationFormProps
  extends FormComponentProps<CustomerInformationFormValues> {}

export const DEFAULT_VALUES: CustomerInformationFormValues = {
  companyId: '',
  companyName: '',
  addressAddon: '',
  city: '',
  commercialRegisterNumber: '',
  commercialRegisterNumberRequired: true,
  country: 'DE',
  legalForm: '',
  postcode: '',
  registrationAuthority: '',
  streetAndNumber: '',
  vatId: '',
};

export const CustomerInformationForm = memo((props: CustomerInformationFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useCustomerInformationFormSchema();

  const api = useForm<CustomerInformationFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  return (
    <Form api={api} loading={loading} submitLabel={translations.nextLabel} onSubmit={onSubmit}>
      <CompanyIdFormField />
      <CountryFormField query={COUNTRY_QUERY} />
      <LegalFormField />
      <RegistrationAuthorityFormField />
      <CommercialRegisterNumberFormField />
      <VatIdFormField />
      <StreetAndNumberFormField />
      <AddressAddonFormField />
      <PostcodeFormField />
      <CityFormField />
    </Form>
  );
});
