import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { getPaymentDetailsForm, sendPaymentDetailsForm } from 'state/payments';
import { PaymentDetailsForm } from './PaymentDetailsForm';
import { PaymentDetailsFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Payment details'),
  description: t('We need some details about the invoice or credit note that you want to factor.'),
});

export const PaymentDetailsEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { paymentId } = useParams();

  const getFormData = useMemo(() => () => getPaymentDetailsForm(paymentId!), [paymentId]);
  const sendFormData = useMemo(
    () => (data: PaymentDetailsFormValues) => sendPaymentDetailsForm(paymentId!, data),
    [paymentId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'payment-details',
    getFormData,
    sendFormData
  );

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      <PaymentDetailsForm initialValues={initialValues} loading={loading} onSubmit={submitData} />
    </WorkflowLayoutContent>
  );
});
