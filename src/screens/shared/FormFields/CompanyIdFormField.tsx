import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { TextFormField, TextFormFieldProps } from './TextFormField';

const phrases = (t: TranslateFn) => ({
  label: t('Customer company name'),
});

export const CompanyIdFormField = <TFieldValues extends { companyName: string }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.label} name="companyName" {...props} />;
};
