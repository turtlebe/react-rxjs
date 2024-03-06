import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { getBeneficialOwnersFormData, sendBeneficialOwnersFormData } from 'api/kyc';
import { BeneficialOwnersForm } from './BeneficialOwnersForm';
import { BeneficialOwnersFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Beneficial owners'),
  descriptionP1: t('The benefical owners of your company include any natural person who'),
  descriptionP2: t(
    '(1) directly or indirectly holds more than 25% of the capital shares directly or indirectly controls more than 25% of the voting rights at any inital level of participation, or'
  ),
  descriptionP3: t(
    '(2) indirectly exercises control over more than 25% of the capital or voting rights from a higher level of ownership (Section 3 GwG). Indirect control is to be understood in particular in terms of controlling influence in accordance with Section 290 HGB (including majority of voting rights).'
  ),
});

export const BeneficialOwnersEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { companyId } = useParams();

  const getFormValues = useMemo(() => () => getBeneficialOwnersFormData(companyId!), [companyId]);
  const sendFormValues = useMemo(
    () => (data: BeneficialOwnersFormValues) => sendBeneficialOwnersFormData(companyId!, data),
    [companyId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'beneficial-owners',
    getFormValues,
    sendFormValues
  );

  return (
    <WorkflowLayoutContent
      title={translations.title}
      description={
        <>
          <p>{translations.descriptionP1}</p>
          <p>{translations.descriptionP2}</p>
          <p>{translations.descriptionP3}</p>
        </>
      }
    >
      <BeneficialOwnersForm initialValues={initialValues} loading={loading} onSubmit={submitData} />
    </WorkflowLayoutContent>
  );
});
