import { useMemo } from 'react';
import { Option } from 'components/types';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { sortOptions } from 'utils/objects';
import { languages } from 'ref-data/languages';
import { SelectFormField, SelectFormFieldProps } from './SelectFormField';

const phrases = (t: TranslateFn) => ({
  label: t('Language'),
});

export const LanguageFormField = <TFieldValues extends { language: any }>(
  props: Partial<SelectFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const languageOptions = useMemo(
    () =>
      Object.entries(languages)
        .map<Option>(([code, name]) => ({
          label: name,
          value: code,
        }))
        .sort(sortOptions),
    []
  );

  return (
    <SelectFormField
      label={translations.label}
      name="language"
      options={languageOptions}
      {...props}
    />
  );
};
