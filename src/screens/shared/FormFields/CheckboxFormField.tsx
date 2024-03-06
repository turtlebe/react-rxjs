import { FieldValues } from 'react-hook-form';
import { Checkbox, CheckboxProps } from 'components/Checkbox';
import { BaseFormField } from './BaseFormField';
import { FormFieldProps } from './types';

type CheckboxFormFieldBaseProps<TFieldValues extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'onChange' | 'value'
> &
  Omit<FormFieldProps<TFieldValues>, 'label'>;

export interface CheckboxFormFieldProps<TFieldValues extends FieldValues>
  extends CheckboxFormFieldBaseProps<TFieldValues> {}

export const CheckboxFormField = <TFieldValues extends FieldValues>(
  props: CheckboxFormFieldProps<TFieldValues>
) => {
  const { disabled, helperText, name, namePath, ...rest } = props;

  return (
    <BaseFormField
      name={name}
      namePath={namePath}
      render={({ error, field, isSubmitting, value }) => (
        <Checkbox
          {...field}
          {...rest}
          checked={value}
          disabled={disabled || isSubmitting}
          error={!!error}
          helperText={error?.message || helperText}
          size="medium"
        />
      )}
    />
  );
};
