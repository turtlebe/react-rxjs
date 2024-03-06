import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { getBankAccountFormData, sendBankAccountFormData } from 'api/kyc';
import { BankAccountForm } from './BankAccountForm';
import { BankAccountFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Bank account'),
  description: t('We need your bank account details in order to pay you fast.'),
});

export const BankAccountEntry = memo(() => {
  const translations = useTranslatedText(phrases);
  const { companyId } = useParams();

  const getFormValues = useMemo(() => () => getBankAccountFormData(companyId!), [companyId]);
  const sendFormValues = useMemo(
    () => (data: BankAccountFormValues) => sendBankAccountFormData(companyId!, data),
    [companyId]
  );

  const { initialValues, loading, submitData } = useFormApiConnector(
    'bank-account',
    getFormValues,
    sendFormValues
  );

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      <BankAccountForm initialValues={initialValues} loading={loading} onSubmit={submitData} />
    </WorkflowLayoutContent>
  );
});
