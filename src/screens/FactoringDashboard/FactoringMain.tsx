import { ChangeEvent, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from 'components/TextInput';
import { WorkflowButton } from 'components/Button';
import { IconCircle } from 'components/IconCircle';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { DocumentDone } from 'theme/icons';
import { paths } from 'paths';
import { setPaymentSearchText, useUserHasRequests } from 'state/payments';
import { BalanceOverviewSection } from './BalanceOverviewSection';
import { FactoringPaymentsList } from './FactoringPaymentsList';

const phrases = (t: TranslateFn) => ({
  searchPlaceholder: t('Customer name'),
  requestPaymentLabel: t('Request new payment'),
});

export const FactoringMain = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const userHasRequests = useUserHasRequests();

  const handleStartNewPayment = useCallback(() => {
    navigate(paths.root.factoring.createPayment.path);
  }, [navigate]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (userHasRequests) {
        setPaymentSearchText(e.target.value.trim());
      }
    },
    [userHasRequests]
  );

  return (
    <div css={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexFlow: 'column' }}>
      <BalanceOverviewSection />
      <SearchInput placeholder={translations.searchPlaceholder} onChange={handleSearchChange} />
      <WorkflowButton
        css={(theme) => ({ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(3.75) })}
        startIcon={
          <IconCircle>
            <DocumentDone />
          </IconCircle>
        }
        onClick={handleStartNewPayment}
      >
        {translations.requestPaymentLabel}
      </WorkflowButton>
      <FactoringPaymentsList />
    </div>
  );
});
