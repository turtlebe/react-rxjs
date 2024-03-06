import { memo } from 'react';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { BicFormField, IbanFormField } from 'screens/shared/FormFields';
import { FormComponentProps } from 'screens/shared/types';
import { AuthorizationFormField } from './AuthorizationFormField';
import { useBankAccountFormSchema } from './useBankAccountFormSchema';
import { BankAccountFormValues } from './types';

const phrases = (t: TranslateFn) => ({ nextLabel: t('Next') });

export interface BankAccountFormProps extends FormComponentProps<BankAccountFormValues> {}

const DEFAULT_VALUES: BankAccountFormValues = {
  authorization: false,
  bic: '',
  iban: '',
};

export const BankAccountForm = memo((props: BankAccountFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useBankAccountFormSchema();

  const api = useForm<BankAccountFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  return (
    <Form api={api} loading={loading} submitLabel={translations.nextLabel} onSubmit={onSubmit}>
      <IbanFormField />
      <BicFormField />
      <AuthorizationFormField />
    </Form>
  );
});
