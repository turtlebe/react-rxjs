import { memo, useCallback, useMemo } from 'react';
import { useParams, RouteObject, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { completeUploadById } from 'state/orders';
import { paths } from 'paths';
import { OrderUploadOrderForm } from './OrderUploadOrderForm';
import { UploadOrderFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Upload transport order'),
});

export const UploadOrderPage = memo(() => {
  const translations = useTranslatedText(phrases);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const submitData = useMemo(
    () => async (data: UploadOrderFormValues) => {
      await completeUploadById(orderId!, data.orderUploadId);
      navigate(-1);
      posthog.capture('Document uploaded', {
        orderId,
        documentType: 'TRANSPORT_ORDER',
      });
    },
    [orderId, navigate]
  );

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <OrderUploadOrderForm onSubmit={submitData} />
    </ForestHeaderPage>
  );
});

export const UploadOrderRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.uploadOrder.path,
    element: <UploadOrderPage />,
  },
];
