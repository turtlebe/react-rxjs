import { memo, useCallback, useMemo } from 'react';
import { useParams, RouteObject, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { completeUploadById } from 'state/orders';
import { paths } from 'paths';
import { OrderUploadPodForm } from './OrderUploadPodForm';
import { UploadPodFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Upload POD'),
});

export const UploadPodPage = memo(() => {
  const translations = useTranslatedText(phrases);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const submitData = useMemo(
    () => async (data: UploadPodFormValues) => {
      await completeUploadById(orderId!, data.proofOfDeliveryUploadId);
      navigate(-1);
      posthog.capture('Document uploaded', {
        orderId,
        documentType: 'PROOF_OF_DELIVERY',
      });
    },
    [orderId, navigate]
  );

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <OrderUploadPodForm onSubmit={submitData} />
    </ForestHeaderPage>
  );
});

export const UploadPodRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.uploadPod.path,
    element: <UploadPodPage />,
  },
];
