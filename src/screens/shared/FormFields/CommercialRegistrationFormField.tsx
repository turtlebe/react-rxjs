import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsCommercialNumberRequired } from 'state/register-authority';
import { TextFormField } from './TextFormField';
import { FormFieldProps } from './types';

const phrases = (t: TranslateFn) => ({
  label: t('Commercial register number'),
});

interface BaseFormValues {
  commercialRegisterNumber: string;
  commercialRegisterNumberRequired: boolean;
  registrationAuthority: string;
}

export const CommercialRegisterNumberFormField = (
  props: Partial<FormFieldProps<BaseFormValues>>
) => {
  const translations = useTranslatedText(phrases);
  const { getValues, setValue, watch } = useFormContext<BaseFormValues>();
  const registrationAuthority = watch('registrationAuthority');
  const enabled = useIsCommercialNumberRequired(registrationAuthority);

  useEffect(() => {
    if (!enabled) {
      setValue('commercialRegisterNumber', '');
    }

    const numberRequired = getValues('commercialRegisterNumberRequired');
    if (numberRequired !== enabled) {
      setValue('commercialRegisterNumberRequired', enabled);
    }
  }, [enabled, getValues, setValue]);

  return (
    <TextFormField
      disabled={!enabled}
      label={translations.label}
      name="commercialRegisterNumber"
      {...props}
    />
  );
};
