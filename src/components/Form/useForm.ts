import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  DeepPartial,
  FieldValues,
  useForm as useFormHook,
  UseFormProps as UseFormHookProps,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { removeUndefinedEntries } from 'utils/objects';

interface UseFormProps<
  TFieldValues extends FieldValues,
  TContext = any,
  TSchema extends AnyObjectSchema = AnyObjectSchema
> extends Omit<UseFormHookProps<TFieldValues, TContext>, 'resolver'> {
  initialValues?: DeepPartial<TFieldValues>;
  schema?: TSchema;
}

export const useForm = <
  TFieldValues extends FieldValues,
  TContext = any,
  TSchema extends AnyObjectSchema = AnyObjectSchema
>(
  props: UseFormProps<TFieldValues, TContext, TSchema>
) => {
  const { defaultValues, initialValues, schema, ...rest } = props;

  const resolvedDefault = useMemo<DeepPartial<TFieldValues> | undefined>(
    () =>
      defaultValues
        ? ({
            ...defaultValues,
            ...removeUndefinedEntries(initialValues),
          } as DeepPartial<TFieldValues>)
        : undefined,
    [defaultValues, initialValues]
  );

  const api = useFormHook<TFieldValues, TContext>({
    reValidateMode: 'onBlur',
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: resolvedDefault,
    ...rest,
  });

  const { reset } = api;

  useEffect(() => {
    reset(resolvedDefault);
  }, [reset, resolvedDefault]);

  return api;
};
