import { memo, useCallback, useState } from 'react';
import { useParams, RouteObject, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { Button } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { createOrderDocumentAndGetId } from 'state/orders';
import { paths, sibling } from 'paths';
import { CreateInvoiceFormValues } from './types';
import { OrderCreateInvoiceForm } from './OrderCreateInvoiceForm';

const translationKeys = {
  title: 'Create invoice',
  createInvoiceError: 'There was an error generating the invoice.',
};
const phrases = (t: TranslateFn) => ({
  title: t('Create invoice'),
  createInvoiceError: t('There was an error generating the invoice.'),
  createCollectiveInvoice: t('Create a collective invoice for multiple orders instead?'),
});

export const OrderCreateInvoicePage = memo(() => {
  const translations = useTranslatedText(phrases);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const submitData = useCallback(
    async (data: CreateInvoiceFormValues) => {
      setLoading(true);
      const documentId = await createOrderDocumentAndGetId(
        orderId!,
        'INVOICE',
        translationKeys.createInvoiceError,
        data.invoiceNumber
      );
      setLoading(false);
      if (documentId) {
        navigate(sibling(paths.root.orders.order.actions.sendInvoice.path, documentId));
        posthog.capture('Invoice created', {
          orderId,
          documentType: 'INVOICE',
          invoiceNumber: data.invoiceNumber,
        });
      }
    },
    [navigate, orderId]
  );

  return (
    <ForestHeaderPage title={translations.title} onClose={() => navigate(-1)}>
      <OrderCreateInvoiceForm loading={loading} onSubmit={submitData} />
      <Button color="tertiary" css={(theme) => ({ marginTop: theme.spacing(3) })}>
        {translations.createCollectiveInvoice}
      </Button>
    </ForestHeaderPage>
  );
});

export const CreateInvoiceRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.createInvoice.path,
    element: <OrderCreateInvoicePage />,
  },
];
