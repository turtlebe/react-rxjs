import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useChangedField } from 'hooks/useChangedField';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { legalFormCodes } from 'ref-data/legalForms';
import { registerAuthorityCodes } from 'ref-data/registerAuthorities';
import { PENDING } from 'state';
import { loadRegisterAuthorities, useRegisterAuthorityOptions } from 'state/register-authority';
import { SelectFormField } from './SelectFormField';
import { FormFieldProps } from './types';

const phrases = (t: TranslateFn) => ({ label: t('Registration authority') });

interface BaseFormValues {
  country: string;
  legalForm: string;
  registrationAuthority: string;
}

export const RegistrationAuthorityFormField = (props: Partial<FormFieldProps<BaseFormValues>>) => {
  const translations = useTranslatedText(phrases);
  const { resetField, setValue, watch } = useFormContext<BaseFormValues>();
  const [disabled, setDisabled] = useState(false);

  const { previous, value: country } = useChangedField<BaseFormValues>('country');
  const legalForm = watch('legalForm');
  const options = useRegisterAuthorityOptions();

  useEffect(() => {
    loadRegisterAuthorities(country);

    if (previous !== country) {
      resetField('registrationAuthority');
    }
  }, [country, resetField, previous]);

  useEffect(() => {
    if (
      country === 'DE' &&
      [legalFormCodes.Einzelunternehmen, legalFormCodes.GbR].includes(legalForm)
    ) {
      setValue('registrationAuthority', registerAuthorityCodes.Gewerbeamt);
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [country, legalForm, setValue]);

  return (
    <SelectFormField<BaseFormValues>
      disabled={disabled}
      label={translations.label}
      loading={options === PENDING}
      name="registrationAuthority"
      options={options !== PENDING ? options : []}
      {...props}
    />
  );
};
