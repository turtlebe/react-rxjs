import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { LoadingButton } from 'components/Button';
import { ColumnLayout, ColumnLayoutProps } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';

const phrases = (t: TranslateFn) => ({ submitLabel: t('Submit') });

const style = (theme: Theme, heightAuto: boolean) =>
  css({
    height: heightAuto ? 'auto' : '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
  });

const additionalContentStyle = (theme: Theme) =>
  css({
    flexShrink: 0,
    marginBottom: theme.spacing(1.5),
  });

type HTMLFormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export interface FormProps<TFieldValues extends FieldValues, TContext = any>
  extends ColumnLayoutProps {
  additionalFooterContent?: ReactNode;
  api: UseFormReturn<TFieldValues, TContext>;
  formProps?: Omit<HTMLFormProps, 'onSubmit'>;
  heightAuto?: boolean;
  loading?: boolean;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  submitLabel?: string;
}

export const Form = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: FormProps<TFieldValues, TContext>
) => {
  const {
    additionalFooterContent,
    api,
    children,
    className,
    flowDirection,
    formProps,
    heightAuto,
    loading,
    onInvalid,
    onSubmit,
    submitLabel,
  } = props;
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = api;
  const translations = useTranslatedText(phrases);

  return (
    <FormProvider {...api}>
      <form
        css={(theme) => style(theme, !!heightAuto)}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        {...formProps}
      >
        <ColumnLayout className={className} flowDirection={flowDirection}>
          {children}
        </ColumnLayout>
        <div css={additionalContentStyle}>{additionalFooterContent ?? null}</div>
        <LoadingButton css={{ flexShrink: 0 }} loading={isSubmitting} type="submit">
          {submitLabel || translations.submitLabel}
        </LoadingButton>
        <LoadingBackdrop loading={loading} />
      </form>
    </FormProvider>
  );
};
