import { useEffect, useRef } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

export const useChangedField = <
  TFieldValues extends FieldValues,
  TField extends Path<TFieldValues> = Path<TFieldValues>
>(
  field: TField
) => {
  const { watch } = useFormContext<TFieldValues>();

  const value = watch(field);

  const previousRef = useRef<PathValue<TFieldValues, TField>>(value);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return {
    value,
    previous: previousRef.current,
  };
};
