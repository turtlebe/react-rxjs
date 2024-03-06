import { memo, useCallback, useMemo } from 'react';
import { useParams, RouteObject, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { completeUploadById } from 'state/orders';
import { paths } from 'paths';
import { OrderUploadCreditNoteForm } from './OrderUploadCreditNoteForm';
import { UploadCreditNoteFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Upload credit note'),
});

export const UploadCreditNotePage = memo(() => {
  const translations = useTranslatedText(phrases);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const submitData = useMemo(
    () => async (data: UploadCreditNoteFormValues) => {
      await completeUploadById(orderId!, data.creditNoteUploadId, data.creditNoteDate!);
      navigate(-1);
      posthog.capture('Document uploaded', {
        orderId,
        documentType: 'CREDIT_NOTE',
      });
    },
    [orderId, navigate]
  );

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <OrderUploadCreditNoteForm onSubmit={submitData} />
    </ForestHeaderPage>
  );
});

export const UploadCreditNoteRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.uploadCreditNote.path,
    element: <UploadCreditNotePage />,
  },
];
