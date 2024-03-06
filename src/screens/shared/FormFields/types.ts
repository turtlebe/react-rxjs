import { ReactElement } from 'react';
import {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

export interface BaseFormFieldRenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  error?: FieldError;
  field: ControllerRenderProps<TFieldValues, TName>;
  isSubmitting?: boolean;
  value: PathValue<TFieldValues, Path<TFieldValues>>;
}

export interface BaseFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: Path<TFieldValues>;
  namePath?: Array<number | string>;
  render: (props: BaseFormFieldRenderProps<TFieldValues, TName>) => ReactElement;
}

export interface FormFieldProps<TFieldValues extends FieldValues>
  extends Omit<BaseFormFieldProps<TFieldValues>, 'render'> {
  disabled?: boolean;
  helperText?: string;
  label?: string;
}
