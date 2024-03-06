import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CurrencyInput, CurrencyInputProps } from 'components/TextInput';
import { Locale } from 'theme/icons/locales';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type CurrencyFormFieldBaseProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Omit<CurrencyInputProps, 'onChange' | 'value'>;

export interface CurrencyFormFieldProps<TFieldValues extends FieldValues>
  extends CurrencyFormFieldBaseProps<TFieldValues> {}

export const CurrencyFormField = <TFieldValues extends FieldValues>(
  props: CurrencyFormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;
  const { i18n } = useTranslation();

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <CurrencyInput
          {...field}
          {...rest}
          disabled={disabled || isSubmitting}
          error={!!error}
          helperText={error?.message || helperText}
          locale={i18n.language as Locale}
          value={value}
        />
      )}
    />
  );
};
