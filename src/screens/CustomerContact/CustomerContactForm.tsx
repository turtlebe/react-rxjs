import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  ContactIdFormField,
  EmailFormField,
  PhoneNumberFormField,
} from 'screens/shared/FormFields';
import { FormComponentProps } from 'screens/shared/types';
import { NEW_ID } from 'state';
import { loadCustomerCompanyDetails, useCustomerCompanyContacts } from 'state/customers';
import { CompanyContact } from 'api/types';
import { useCustomerContactFormSchema } from './useCustomerContactFormSchema';

const phrases = (t: TranslateFn) => ({
  nextLabel: t('Next'),
  emailLabel: t('Contact email (bookkeeping)'),
  phoneNumberLabel: t('Contact phone (bookkeeping)'),
});

export interface CustomerContactFormProps extends FormComponentProps<CompanyContact> {}

export const DEFAULT_VALUES: CompanyContact = {
  contactId: '',
  contactName: '',
  email: '',
  phoneNumber: '',
};

export const CustomerContactForm = memo((props: CustomerContactFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useCustomerContactFormSchema();

  const api = useForm<CompanyContact>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const { setValue, watch } = api;
  const contactId = watch('contactId');
  const customerCompanyContacts = useCustomerCompanyContacts();
  const disableContactFields = contactId !== NEW_ID;
  const { customerId } = useParams();

  useEffect(() => {
    if (customerId) {
      loadCustomerCompanyDetails(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    const contact = customerCompanyContacts.find((c) => c.contactId === contactId);

    if (contactId === NEW_ID || contactId === '' || !contact) {
      setValue('phoneNumber', DEFAULT_VALUES.phoneNumber);
      setValue('email', DEFAULT_VALUES.email);
    } else {
      setValue('contactName', contact.contactName || '', { shouldValidate: true });
      setValue('phoneNumber', contact.contactDetails?.phoneNumber || '', { shouldValidate: true });
      setValue('email', contact.contactDetails?.email || '', { shouldValidate: true });
    }
  }, [customerCompanyContacts, contactId, setValue]);

  return (
    <Form
      api={api}
      flowDirection="one-column"
      loading={loading}
      submitLabel={translations.nextLabel}
      onSubmit={onSubmit}
    >
      <ContactIdFormField />
      <EmailFormField disabled={disableContactFields} label={translations.emailLabel} />
      <PhoneNumberFormField disabled={disableContactFields} label={translations.phoneNumberLabel} />
    </Form>
  );
});
