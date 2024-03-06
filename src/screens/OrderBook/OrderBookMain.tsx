import { ChangeEvent, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { posthog } from 'posthog-js';
import { SearchInput } from 'components/TextInput';
import { WorkflowButton } from 'components/Button';
import { IconCircle } from 'components/IconCircle';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { DocumentDone } from 'theme/icons';
import { paths } from 'paths';
import { setOrderSearchText, useUserHasOrders } from 'state/orders';
import { OrderBookOrderList } from './OrderBookOrderList';

const phrases = (t: TranslateFn) => ({
  searchPlaceholder: t('Search an order'),
  newOrderLabel: t('Add new order'),
});

export const OrderBookMain = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const userHasOrders = useUserHasOrders();

  const handleStartNewOrder = useCallback(() => {
    navigate(paths.root.orders.order.create.customerSelection.path);
    posthog.capture('Order creation started');
  }, [navigate]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (userHasOrders) {
        setOrderSearchText(e.target.value.trim());
      }
    },
    [userHasOrders]
  );

  return (
    <div css={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexFlow: 'column' }}>
      <SearchInput placeholder={translations.searchPlaceholder} onChange={handleSearchChange} />
      <WorkflowButton
        css={(theme) => ({ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(3.75) })}
        startIcon={
          <IconCircle>
            <DocumentDone />
          </IconCircle>
        }
        onClick={handleStartNewOrder}
      >
        {translations.newOrderLabel}
      </WorkflowButton>
      <OrderBookOrderList />
    </div>
  );
});
