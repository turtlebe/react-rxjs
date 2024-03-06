import { memo, useCallback, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { LoadingButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  setLoadFromDateTime,
  setLoadFromIndex,
  useIsEndOfPaymentsList,
  useIsPaymentsListLoading,
  usePaymentRequestList,
  useUserHasRequests,
} from 'state/payments';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PaymentRequestList } from 'screens/shared/PaymentRequestList';
import { DeletePaymentPopup } from './DeletePaymentPopup';
import { EmptyPaymentsList } from './EmptyPaymentsList';
import { NoSearchResults } from './NoSearchResults';

const phrases = (t: TranslateFn) => ({
  title: t('Payments'),
  loadMoreLabel: t('Load more'),
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

export const FactoringPaymentsList = memo(() => {
  const translations = useTranslatedText(phrases);
  const paymentRequests = usePaymentRequestList();
  const isListLoading = useIsPaymentsListLoading();
  const isEndOfList = useIsEndOfPaymentsList();
  const userHasRequests = useUserHasRequests();

  const showMoreButton = !isEndOfList && paymentRequests.length > 0;

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | undefined>(undefined);

  const handleLoadMore = useCallback(() => {
    const last = paymentRequests.length ? paymentRequests[paymentRequests.length - 1] : undefined;

    if (last) {
      setLoadFromIndex(last.sortIndex + 1);
    }
  }, [paymentRequests]);

  const handleDeletePopupClose = useCallback(() => {
    setConfirmDeleteId(undefined);
  }, []);

  useEffect(() => {
    setLoadFromDateTime(new Date());
  }, []);

  return (
    <div css={style}>
      <Typography css={{ flexShrink: 0 }} variant="h3">
        {translations.title}
      </Typography>
      <div css={listContainerStyle}>
        {paymentRequests.length > 0 && (
          <PaymentRequestList paymentRequests={paymentRequests} onDelete={setConfirmDeleteId} />
        )}
        {paymentRequests.length === 0 && !userHasRequests && !isListLoading && (
          <EmptyPaymentsList />
        )}
        {paymentRequests.length === 0 && userHasRequests && !isListLoading && <NoSearchResults />}
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
      <LoadingBackdrop loading={isListLoading} />
      <DeletePaymentPopup requestId={confirmDeleteId} onClose={handleDeletePopupClose} />
    </div>
  );
});
