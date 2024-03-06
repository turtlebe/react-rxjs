import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { getBusinessDataFormData, sendBusinessDataFormData } from 'api/kyc';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { BusinessDataForm } from './BusinessDataForm';
import { BusinessDataFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Business data'),
  description: t(
    "We need your business data in order to provide our services. Once you've submitted your data, we will do a quick review together with our factoring partner Walbing so you can start factoring in no time."
  ),
});

export const BusinessDataEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { companyId } = useParams();

  const getFormValues = useMemo(() => () => getBusinessDataFormData(companyId!), [companyId]);
  const sendFormValues = useMemo(
    () => (data: BusinessDataFormValues) => sendBusinessDataFormData(companyId!, data),
    [companyId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'business-data',
    getFormValues,
    sendFormValues
  );

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      <BusinessDataForm initialValues={initialValues} loading={loading} onSubmit={submitData} />
    </WorkflowLayoutContent>
  );
});
