import { memo, useCallback, useState, Suspense } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useLoaderData, useParams, RouteObject, defer, Await } from 'react-router-dom';
import { Grid } from '@mui/material';
import posthog from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { Typography } from 'components/Typography';
import { PdfViewer } from 'components/PdfViewer';
import {
  TranslateFn,
  useTranslatedText,
  useTranslationKeys,
  withParams,
} from 'hooks/useTranslatedText';
import {
  sendDocumentByOrderId,
  getInvoicePagePreloadData,
  getAndWaitForDocumentUrlById,
} from 'state/orders';
import { ErrorPage } from 'screens/ErrorPage';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { parent, path, paths, sibling } from 'paths';
import { LoadingButton } from 'components/Button/LoadingButton';

const phrases = (t: TranslateFn) => ({
  title: t('Send invoice'),
  podPreview: t('POD preview'),
  invoicePreview: t('Invoice preview'),
  disclaimer: t(
    'With a click on "Send invoice" we will send the invoice as well as the proof of delivery via email to your customer (bookkeeping contact). You will of course be in CC on that email.'
  ),
  sendButton: t('Send invoice'),
  mainText: t('Invoice successfully sent!'),
  subText: withParams<'email'>((p) =>
    t('We have sent the invoice and proof of delivery via email to {{email}}.', p)
  ),
  errorDescription: t('There was an error sending the invoice.'),
});

const pageStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(2.5),
  });

const documentStyle = (theme: Theme) =>
  css({
    margin: 'auto',
    paddingTop: theme.spacing(1.5),
    width: '100%',
  });

const disclaimerStyle = (theme: Theme) =>
  css({
    padding: theme.spacing(4, 0),
    margin: 'auto',
    textAlign: 'center',
  });

export interface InvoicePagePreloadData {
  contactEmail?: string;
  downloadLink?: string;
}

export const SendInvoicePage = memo(() => {
  const data = useLoaderData() as {
    documentUrl: Promise<string>;
    preloadData: Promise<InvoicePagePreloadData>;
  };
  const params = useParams();
  const translations = useTranslatedText(phrases);
  const translationsKeys = useTranslationKeys(phrases);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const documentType = 'INVOICE';

  const handleSubmit = useCallback(
    async (email?: string) => {
      setIsSubmitting(true);
      const result = await sendDocumentByOrderId(
        params.orderId!,
        documentType,
        translationsKeys.errorDescription
      );
      if (result) {
        navigate(sibling(paths.root.orders.order.actions.success.path), {
          state: {
            mainText: translations.mainText,
            subText: translations.subText({ email }),
          },
        });
        posthog.capture('Invoice sent', {
          orderId: params.orderId,
          documentType,
        });
      } else {
        setIsSubmitting(false);
      }
    },
    [params, navigate, translations, translationsKeys]
  );

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClose = useCallback(() => {
    navigate(parent(path(paths.root.orders.order.path, params.orderId!)));
  }, [navigate, params.orderId]);

  return (
    <ForestHeaderPage title={translations.title} onBack={handleBack} onClose={handleClose}>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await
          errorElement={<ErrorPage description={translations.errorDescription} />}
          resolve={Promise.all([data.documentUrl, data.preloadData])}
        >
          {([documentUrl, preloadData]: [string, InvoicePagePreloadData]) => (
            <div css={pageStyle}>
              <Grid container direction="row" spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography variant="h2">{translations.invoicePreview}</Typography>
                  <div css={documentStyle}>
                    <PdfViewer pdfUrl={documentUrl} />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h2">{translations.podPreview}</Typography>
                  <div css={documentStyle}>
                    <PdfViewer pdfUrl={preloadData.downloadLink!} />
                  </div>
                </Grid>
              </Grid>
              <Typography css={disclaimerStyle} variant="body1">
                {translations.disclaimer}
              </Typography>
              <LoadingButton
                css={{ flexShrink: 0 }}
                loading={isSubmitting}
                onClick={() => handleSubmit(preloadData.contactEmail)}
              >
                {translations.sendButton}
              </LoadingButton>
            </div>
          )}
        </Await>
      </Suspense>
    </ForestHeaderPage>
  );
});

export const SendInvoiceRoute: RouteObject[] = [
  {
    path: path(paths.root.orders.order.actions.sendInvoice.path, ':documentId'),
    element: <SendInvoicePage />,
    loader: ({ params }) =>
      defer({
        documentUrl: getAndWaitForDocumentUrlById(params.orderId!, params.documentId!),
        preloadData: getInvoicePagePreloadData(params.orderId!),
      }),
  },
];
