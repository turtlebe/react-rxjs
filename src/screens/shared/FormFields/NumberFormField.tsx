import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NumberInput, NumberInputProps } from 'components/TextInput';
import { Locale } from 'theme/icons/locales';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type NumberFormFieldBaseProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Omit<NumberInputProps, 'onChange' | 'value'>;

export interface NumberFormFieldProps<TFieldValues extends FieldValues>
  extends NumberFormFieldBaseProps<TFieldValues> {}

export const NumberFormField = <TFieldValues extends FieldValues>(
  props: NumberFormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;
  const { i18n } = useTranslation();

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <NumberInput
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
