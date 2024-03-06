import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface FormComponentProps<TFieldValues extends FieldValues> {
  initialValues?: Partial<TFieldValues>;
  loading?: boolean;
  onSubmit: SubmitHandler<TFieldValues>;
}
