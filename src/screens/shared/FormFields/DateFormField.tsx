import { useCallback } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { DateInput, DateInputProps } from 'components/DateInput';
import { BaseFormField } from './BaseFormField';
import { useFormFieldName } from './hooks';
import { FormFieldProps } from './types';

type DateFormFieldBaseProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Omit<DateInputProps, 'onChange' | 'value'>;

export interface DateFormFieldProps<TFieldValues extends FieldValues>
  extends DateFormFieldBaseProps<TFieldValues> {}

export const DateFormField = <TFieldValues extends FieldValues>(
  props: DateFormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;
  const { clearErrors, setValue } = useFormContext();
  const resolvedName = useFormFieldName(name, namePath);

  const handleChange = useCallback(
    (value: Date | null) => {
      clearErrors(resolvedName);
      setValue(resolvedName, value as any);
    },
    [clearErrors, resolvedName, setValue]
  );

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <DateInput
          {...field}
          {...rest}
          disabled={isSubmitting || disabled}
          error={!!error}
          helperText={error?.message || helperText}
          value={value}
          onChange={handleChange}
        />
      )}
    />
  );
};
