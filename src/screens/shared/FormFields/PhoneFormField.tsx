import { FieldValues } from 'react-hook-form';
import { PhoneInput, PhoneInputProps } from 'components/PhoneInput';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type PhoneFormFieldBaseProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Omit<PhoneInputProps, 'onChange' | 'value'>;

export interface PhoneFormFieldProps<TFieldValues extends FieldValues>
  extends PhoneFormFieldBaseProps<TFieldValues> {}

export const PhoneFormField = <TFieldValues extends FieldValues>(
  props: FormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <PhoneInput
          {...field}
          {...rest}
          disabled={disabled || isSubmitting}
          error={!!error}
          helperText={error?.message || helperText}
          value={value}
        />
      )}
    />
  );
};
