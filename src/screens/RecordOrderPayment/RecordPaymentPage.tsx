import { memo, useCallback } from 'react';
import { css, Theme } from '@emotion/react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import posthog from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { unFuckedIsoDate } from 'utils/date';
import { paths } from 'paths';
import { confirmOrderPaymentReceived } from 'state/orders';
import { RecordPaymentForm } from './RecordPaymentForm';
import { RecordPaymentFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Record receipt of payment'),
});

export const RecordPaymentPage = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const style = (theme: Theme) =>
    css({
      display: 'flex',
      flexFlow: 'column nowrap',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingTop: theme.spacing(3),

      [theme.breakpoints.down('md')]: {
        flexGrow: 1,
      },
    });

  const handleRecordPaymentDate = useCallback(
    async (data: RecordPaymentFormValues) => {
      await confirmOrderPaymentReceived(orderId!, unFuckedIsoDate(data.paymentReceivedOn));
      navigate(-1);
      posthog.capture('Payment recorded', {
        orderId,
        paymentDate: unFuckedIsoDate(data.paymentReceivedOn),
      });
    },
    [orderId, navigate]
  );

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <div css={style}>
        <RecordPaymentForm onSubmit={handleRecordPaymentDate} />
      </div>
    </ForestHeaderPage>
  );
});

export const RecordPaymentRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.recordPayment.path,
    element: <RecordPaymentPage />,
  },
];
