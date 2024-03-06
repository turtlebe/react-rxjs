import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useChangedField } from 'hooks/useChangedField';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { loadLegalForms, useLegalFormOptions } from 'state/legal-form';
import { PENDING } from 'state';
import { SelectFormField } from './SelectFormField';
import { FormFieldProps } from './types';

const phrases = (t: TranslateFn) => ({
  label: t('Legal form'),
});

interface BaseFormValues {
  country: string;
  legalForm: string;
}

export const LegalFormField = (props: Partial<FormFieldProps<BaseFormValues>>) => {
  const translations = useTranslatedText(phrases);
  const { resetField } = useFormContext<BaseFormValues>();
  const { previous, value: country } = useChangedField<BaseFormValues>('country');
  const options = useLegalFormOptions();

  useEffect(() => {
    loadLegalForms(country);

    if (previous !== country) {
      resetField('legalForm');
    }
  }, [country, resetField, previous]);

  return (
    <SelectFormField<BaseFormValues>
      label={translations.label}
      loading={options === PENDING}
      name="legalForm"
      options={options !== PENDING ? options : []}
      {...props}
    />
  );
};
