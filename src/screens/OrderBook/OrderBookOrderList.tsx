import { memo, useCallback, useEffect } from 'react';
import { css, Theme } from '@emotion/react';
import { Fade, Skeleton } from '@mui/material';
import { Typography } from 'components/Typography';
import { LoadingButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  setLoadFromDateTime,
  setLoadFromIndex,
  useIsEndOfOrdersList,
  useIsOrdersListLoading,
  useOrderList,
  useUserHasOrders,
} from 'state/orders';
import { OrderList } from 'screens/shared/OrderList';
import { NoSearchResults } from 'screens/FactoringDashboard/NoSearchResults';
import { EmptyOrderList } from './EmptyOrderList';

const phrases = (t: TranslateFn) => ({
  title: t('Your orders'),
  loadMoreLabel: t('Load more orders'),
});

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  position: 'relative',
  flexGrow: 1,
});

const listContainerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexGrow: 1,
    overflowY: 'auto',
    position: 'relative',
    margin: theme.spacing(1.5, 0),
    flexFlow: 'column',
    alignItems: 'stretch',
  });

const listSkeletonStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  });

export const OrderBookOrderList = memo(() => {
  const translations = useTranslatedText(phrases);
  const orders = useOrderList();
  const isListLoading = useIsOrdersListLoading();
  const isEndOfList = useIsEndOfOrdersList();
  const userHasOrders = useUserHasOrders();

  const showMoreButton = !isEndOfList && orders.length > 0;

  const handleLoadMore = useCallback(() => {
    const last = orders.length ? orders[orders.length - 1] : undefined;

    if (last) {
      setLoadFromIndex(+last.sortIndex! + 1);
    }
  }, [orders]);

  useEffect(() => {
    setLoadFromDateTime(new Date());
  }, []);

  return (
    <div css={style}>
      <Typography css={{ flexShrink: 0 }} variant="h3">
        {translations.title}
      </Typography>
      {isListLoading ? (
        <div css={listSkeletonStyle}>
          <Skeleton height={70} variant="rounded" />
          <Skeleton height={70} variant="rounded" />
          <Skeleton height={70} variant="rounded" />
          <Skeleton height={70} variant="rounded" />
          <Skeleton height={70} variant="rounded" />
        </div>
      ) : null}
      <Fade in={!isListLoading} timeout={600}>
        <div css={listContainerStyle}>
          {orders.length > 0 && <OrderList orders={orders} />}
          {orders.length === 0 && !userHasOrders && !isListLoading && <EmptyOrderList />}
          {orders.length === 0 && userHasOrders && !isListLoading && <NoSearchResults />}
          {showMoreButton && (
            <LoadingButton
              css={(theme) => ({ marginTop: theme.spacing(1.5) })}
              loading={isListLoading}
              onClick={handleLoadMore}
            >
              {translations.loadMoreLabel}
            </LoadingButton>
          )}
        </div>
      </Fade>
    </div>
  );
});
