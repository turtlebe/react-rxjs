import { FieldValues } from 'react-hook-form';
import { Select, SelectProps } from 'components/Select';
import { OptionType } from 'components/types';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type SelectFormFieldBaseProps<
  TFieldValues extends FieldValues,
  TOption extends OptionType
> = FormFieldProps<TFieldValues> & Omit<SelectProps<TOption>, 'onChange' | 'value'>;

export interface SelectFormFieldProps<
  TFieldValues extends FieldValues,
  TOption extends OptionType = OptionType
> extends SelectFormFieldBaseProps<TFieldValues, TOption> {}

export const SelectFormField = <
  TFieldValues extends FieldValues,
  TOption extends OptionType = OptionType
>(
  props: SelectFormFieldProps<TFieldValues, TOption>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting }) => (
        <Select
          {...field}
          {...rest}
          disabled={disabled || isSubmitting}
          error={!!error}
          helperText={error?.message || helperText}
        />
      )}
    />
  );
};
