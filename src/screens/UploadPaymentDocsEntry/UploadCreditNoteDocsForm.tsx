import { memo, useMemo } from 'react';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import { UploadCreditNoteFormField, UploadProofOfDeliveryFormField } from '../shared/FormFields';
import { useUploadCreditNoteDocsFormSchema } from './useUploadCreditNoteDocsFormSchema';
import { UploadPaymentDocsFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  nextLabel: t('Next'),
});

export interface UploadCreditNoteDocsFormProps
  extends FormComponentProps<UploadPaymentDocsFormValues> {}

const DEFAULT_VALUES: UploadPaymentDocsFormValues = {
  confirmInvoiceHasIban: false,
  creditNoteFilename: '',
  creditNoteUploadId: '',
  invoiceFilename: '',
  invoiceUploadId: '',
  proofOfDeliveryFilename: '',
  proofOfDeliveryUploadId: '',
  clearingSystem: 'credit_note',
};

export const UploadCreditNoteDocsForm = memo((props: UploadCreditNoteDocsFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useUploadCreditNoteDocsFormSchema();

  const resetValues = useMemo(
    (): Partial<UploadPaymentDocsFormValues> => ({
      ...initialValues,
      confirmInvoiceHasIban: false,
      invoiceFilename: '',
      invoiceUploadId: '',
      clearingSystem: 'credit_note',
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
      <UploadCreditNoteFormField />
      <UploadProofOfDeliveryFormField />
    </Form>
  );
});
