import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useCustomerCompanyContacts } from 'state/customers';
import {
  AutocompleteOption,
  AutocompleteWithCreateFormField,
} from './AutocompleteWithCreateFormField';

const phrases = (t: TranslateFn) => ({
  label: t('Contact name (bookkeeping)'),
});

export interface ContactIdFormFieldProps {
  disabled?: boolean;
}

export const ContactIdFormField = ({ disabled }: ContactIdFormFieldProps) => {
  const translations = useTranslatedText(phrases);
  const contacts = useCustomerCompanyContacts();

  const options: AutocompleteOption[] = contacts.map(({ contactId, contactName }) => ({
    id: contactId!,
    name: contactName!,
  }));

  return (
    <AutocompleteWithCreateFormField
      disabled={disabled}
      idField="contactId"
      label={translations.label}
      name="contactName"
      options={options}
    />
  );
};
