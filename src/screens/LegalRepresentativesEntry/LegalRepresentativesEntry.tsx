import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { getLegalRepresentativesFormData, sendLegalRepresentativesFormData } from 'api/kyc';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { LegalRepresentativesForm } from './LegalRepresentativesForm';
import { LegalRepresentativesFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Legal representatives'),
  description: t(
    'Using Walbing requires the consent of the legal representatives of your company. You, as well as all other named representatives, will have to do a video identification. Each legal representative will receive an Email from Walbing for this after submitting this form.'
  ),
});

export const LegalRepresentativesEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { companyId } = useParams();

  const getFormValues = useMemo(
    () => () => getLegalRepresentativesFormData(companyId!),
    [companyId]
  );
  const sendFormValues = useMemo(
    () => (data: LegalRepresentativesFormValues) =>
      sendLegalRepresentativesFormData(companyId!, data),
    [companyId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'legal-representatives',
    getFormValues,
    sendFormValues
  );

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      <LegalRepresentativesForm
        initialValues={initialValues}
        loading={loading}
        onSubmit={submitData}
      />
    </WorkflowLayoutContent>
  );
});
