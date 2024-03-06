import { FieldValues } from 'react-hook-form';
import { RadioGroup, RadioGroupProps } from 'components/Radio';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type RadioGroupFormFieldBaseProps<TFieldValues extends FieldValues> =
  FormFieldProps<TFieldValues> & Omit<RadioGroupProps, 'onChange' | 'value'>;

export interface RadioGroupFormFieldProps<TFieldValues extends FieldValues>
  extends RadioGroupFormFieldBaseProps<TFieldValues> {}

export const RadioGroupFormField = <TFieldValues extends FieldValues>(
  props: RadioGroupFormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ref, ...rest } = props;

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <RadioGroup
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
