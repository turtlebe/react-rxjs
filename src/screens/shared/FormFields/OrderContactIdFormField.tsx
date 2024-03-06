import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useCustomerCompanyContacts } from 'state/customers';
import {
  AutocompleteOption,
  AutocompleteWithCreateFormField,
} from './AutocompleteWithCreateFormField';

const phrases = (t: TranslateFn) => ({
  label: t('Name'),
});

export interface OrderContactIdFormFieldProps {
  disabled?: boolean;
}

export const BookKeepingContactIdFormField = ({ disabled }: OrderContactIdFormFieldProps) => {
  const translations = useTranslatedText(phrases);
  const contacts = useCustomerCompanyContacts();

  const options: AutocompleteOption[] = contacts
    .filter(
      (contact) =>
        contact.contactId &&
        contact.contactName &&
        contact.useFor &&
        contact.useFor.includes('bookkeeping')
    )
    .map(({ contactId, contactName }) => ({
      id: contactId!,
      name: contactName!,
    }));

  return (
    <AutocompleteWithCreateFormField
      disabled={disabled}
      idField="bookKeepingContactId"
      label={translations.label}
      name="bookKeepingContactName"
      options={options}
    />
  );
};

export const DispositionContactIdFormField = ({ disabled }: OrderContactIdFormFieldProps) => {
  const translations = useTranslatedText(phrases);
  const contacts = useCustomerCompanyContacts();

  const options: AutocompleteOption[] = contacts
    .filter(
      (contact) =>
        contact.contactId &&
        contact.contactName &&
        contact.useFor &&
        contact.useFor.includes('disposition')
    )
    .map(({ contactId, contactName }) => ({
      id: contactId!,
      name: contactName!,
    }));

  return (
    <AutocompleteWithCreateFormField
      disabled={disabled}
      idField="dispositionContactId"
      label={translations.label}
      name="dispositionContactName"
      options={options}
    />
  );
};
