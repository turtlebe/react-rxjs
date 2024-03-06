import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { useFormFieldError, useFormFieldName } from './hooks';
import { BaseFormFieldProps } from './types';

export const BaseFormField = <TFieldValues extends FieldValues>(
  props: BaseFormFieldProps<TFieldValues>
) => {
  const { name, namePath, render } = props;
  const {
    control,
    formState: { isSubmitting },
    watch,
  } = useFormContext<TFieldValues>();

  const resolvedName = useFormFieldName(name, namePath);
  const resolvedError = useFormFieldError(name, namePath);
  const value = watch(resolvedName);

  return (
    <Controller
      control={control}
      name={resolvedName}
      render={({ field }) =>
        render({
          field,
          error: resolvedError,
          isSubmitting,
          value,
        })
      }
    />
  );
};
