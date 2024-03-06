import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { getCustomerInformationForm, sendCustomerInformationForm } from 'state/payments';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { CustomerInformationForm } from 'screens/shared/CustomerInformationForm';

const phrases = (t: TranslateFn) => ({
  title: t('New Customer'),
  description: t('Please enter the details of the new customer.'),
});

export const CustomerInformationEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { paymentId } = useParams();

  const getFormData = useMemo(() => () => getCustomerInformationForm(paymentId!), [paymentId]);

  const sendFormData = useMemo(
    () => (data: CustomerInformationFormValues) => sendCustomerInformationForm(paymentId!, data),
    [paymentId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'customer-information',
    getFormData,
    sendFormData
  );

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      <CustomerInformationForm
        initialValues={initialValues}
        loading={loading}
        onSubmit={submitData}
      />
    </WorkflowLayoutContent>
  );
});
