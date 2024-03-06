import { memo, useMemo } from 'react';
import { bind } from '@react-rxjs/core';
import { map, of, startWith } from 'rxjs';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useWorkflowData } from 'hooks/useWorkflowData';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { PENDING } from 'state';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PaymentDetailsFormValues } from 'screens/PaymentDetailsEntry/types';
import {
  getPaymentDetailsForm,
  getPaymentsUploadDocsForm,
  sendPaymentsUploadDocsForm,
} from 'state/payments';
import { UploadInvoiceDocsForm } from './UploadInvoiceDocsForm';
import { UploadCreditNoteDocsForm } from './UploadCreditNoteDocsForm';
import { UploadPaymentDocsFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Upload documents'),
  descriptionInvoice: t('Please upload your invoice and proof of delivery.'),
  descriptionCreditNote: t('Please upload your credit note and proof of delivery.'),
});

const [useClearingSystem] = bind(
  (paymentId: string, cachedData: PaymentDetailsFormValues | undefined) =>
    cachedData
      ? of(cachedData.clearingSystem)
      : getPaymentDetailsForm(paymentId).pipe(
          map((data) => (data ? data.clearingSystem : data)),
          startWith(PENDING)
        ),
  PENDING
);

export const UploadPaymentDocsEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { paymentId } = useParams();

  const getFormData = useMemo(() => () => getPaymentsUploadDocsForm(paymentId!), [paymentId]);
  const sendFormData = useMemo(
    () => (data: UploadPaymentDocsFormValues) => sendPaymentsUploadDocsForm(paymentId!, data),
    [paymentId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'upload-payment-docs',
    getFormData,
    sendFormData
  );

  const { data } = useWorkflowData<PaymentDetailsFormValues>('payment-details');
  const clearingSystem = useClearingSystem(paymentId!, data);

  const description =
    clearingSystem === 'invoice'
      ? translations.descriptionInvoice
      : clearingSystem === 'credit_note'
      ? translations.descriptionCreditNote
      : '';

  const FormComponent =
    clearingSystem === 'invoice'
      ? UploadInvoiceDocsForm
      : clearingSystem === 'credit_note'
      ? UploadCreditNoteDocsForm
      : undefined;

  return (
    <WorkflowLayoutContent
      css={(theme) => ({ minHeight: theme.spacing(49.25) })}
      description={description}
      title={translations.title}
    >
      {FormComponent && (
        <FormComponent initialValues={initialValues} loading={loading} onSubmit={submitData} />
      )}
      <LoadingBackdrop loading={!FormComponent} />
    </WorkflowLayoutContent>
  );
});
