import { FieldError, FieldValues, Path, useFormContext } from 'react-hook-form';

const DEFAULT_PATH: Array<number | string> = [];

export const useFormFieldError = <T extends FieldValues>(
  name: Path<T>,
  namePath: Array<number | string> = DEFAULT_PATH
) => {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const resolvedErrorObj = namePath.reduce(
    (path: any, next) => path?.[next],
    errors
  );

  return resolvedErrorObj?.[name] as FieldError | undefined;
};

export const useFormFieldName = <T extends FieldValues>(
  name: Path<T>,
  namePath: Array<number | string> = DEFAULT_PATH
) => {
  const resolvedNamePath = namePath.reduce(
    (path, next) => `${path}.${next}`,
    ''
  );

  return (resolvedNamePath ? `${resolvedNamePath}.${name}` : name) as Path<T>;
};
