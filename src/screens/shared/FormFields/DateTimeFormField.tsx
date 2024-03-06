import { useCallback } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { DateTimeInput, DateTimeInputProps } from 'components/DateTimeInput';
import { BaseFormField } from './BaseFormField';
import { useFormFieldName } from './hooks';
import { FormFieldProps } from './types';

type DateTimeFormFieldBaseProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Omit<DateTimeInputProps, 'onChange' | 'value'>;

export interface DateTimeFormFieldProps<TFieldValues extends FieldValues>
  extends DateTimeFormFieldBaseProps<TFieldValues> {}

export const DateTimeFormField = <TFieldValues extends FieldValues>(
  props: DateTimeFormFieldProps<TFieldValues>
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
        <DateTimeInput
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
