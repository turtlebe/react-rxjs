import { FieldValues } from 'react-hook-form';
import { TextInput, TextInputProps } from 'components/TextInput';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type TextFormFieldBaseProps<TFieldValues extends FieldValues> =
  FormFieldProps<TFieldValues> & Omit<TextInputProps, 'onChange' | 'value'>;

export interface TextFormFieldProps<TFieldValues extends FieldValues>
  extends TextFormFieldBaseProps<TFieldValues> {}

export const TextFormField = <TFieldValues extends FieldValues>(
  props: TextFormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <TextInput
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
