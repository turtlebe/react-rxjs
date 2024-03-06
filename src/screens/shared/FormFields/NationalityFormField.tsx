import { useMemo } from 'react';
import { Option } from 'components/types';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { SelectFormField, SelectFormFieldProps } from './SelectFormField';

const phrases = (t: TranslateFn) => ({
  label: t('Nationality'),
  de: t('Germany'),
  gb: t('England'),
});

export const NationalityFormField = <TFieldValues extends { nationality: any }>(
  props: Partial<SelectFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);

  const options: Option[] = useMemo(
    () => [
      {
        label: translations.de,
        value: 'DE',
      },
      {
        label: translations.gb,
        value: 'GB',
      },
    ],
    [translations]
  );

  return (
    <SelectFormField label={translations.label} name="nationality" options={options} {...props} />
  );
};
