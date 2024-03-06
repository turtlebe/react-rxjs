import { memo, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import { UploadInvoiceFormField, UploadProofOfDeliveryFormField } from '../shared/FormFields';
import { useUploadInvoiceDocsFormSchema } from './useUploadInvoiceDocsFormSchema';
import { UploadPaymentDocsFormValues } from './types';
import { ConfirmIbanFormField } from './ConfirmIbanFormField';

const phrases = (t: TranslateFn) => ({
  nextLabel: t('Next'),
});

export interface UploadInvoiceDocsFormProps
  extends FormComponentProps<UploadPaymentDocsFormValues> {}

const DEFAULT_VALUES: UploadPaymentDocsFormValues = {
  confirmInvoiceHasIban: false,
  creditNoteFilename: '',
  creditNoteUploadId: '',
  invoiceFilename: '',
  invoiceUploadId: '',
  proofOfDeliveryFilename: '',
  proofOfDeliveryUploadId: '',
  clearingSystem: 'invoice',
};

const uploadDocStyle = (theme: Theme) =>
  css({
    [theme.breakpoints.up('md')]: {
      gridColumn: '2',
    },
  });

export const UploadInvoiceDocsForm = memo((props: UploadInvoiceDocsFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useUploadInvoiceDocsFormSchema();

  const resetValues = useMemo(
    (): Partial<UploadPaymentDocsFormValues> => ({
      ...initialValues,
      creditNoteFilename: '',
      creditNoteUploadId: '',
      clearingSystem: 'invoice',
    }),
    [initialValues]
  );

  const api = useForm<UploadPaymentDocsFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues: resetValues,
    schema,
  });

  return (
    <Form api={api} loading={loading} submitLabel={translations.nextLabel} onSubmit={onSubmit}>
      <ConfirmIbanFormField />
      <UploadInvoiceFormField css={uploadDocStyle} />
      <UploadProofOfDeliveryFormField css={uploadDocStyle} />
    </Form>
  );
});
