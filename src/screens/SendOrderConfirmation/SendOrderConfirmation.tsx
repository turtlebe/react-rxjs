import { memo, useCallback, useState, Suspense } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useLoaderData, useParams, RouteObject, defer, Await } from 'react-router-dom';
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
import { sendDocumentByOrderId, getOrderById, getAndWaitForDocumentUrlById } from 'state/orders';
import { Order } from 'api/types';
import { ErrorPage } from 'screens/ErrorPage';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { path, paths, sibling } from 'paths';
import { LoadingButton } from 'components/Button/LoadingButton';

const phrases = (t: TranslateFn) => ({
  title: t('Send order confirmation'),
  podPreview: t('Preview'),
  disclaimer: t(
    'With a click on “Send order confirmation” you will send the order confirmation via email to your customer (dispatching contact). You will of course be in CC on that email.'
  ),
  sendButton: t('Send order confirmation'),
  mainText: t('Order confirmation successfully sent!'),
  subText: withParams<'email'>((p) =>
    t('We have sent the order confirmation via email to {{email}}.', p)
  ),
  errorDescription: t('There was an error sending the order confirmation.'),
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
    width: '50%',
    margin: 'auto',
    paddingTop: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  });

const disclaimerStyle = (theme: Theme) =>
  css({
    padding: theme.spacing(4, 0),
    margin: 'auto',
    textAlign: 'center',
  });

export const SendOrderConfirmationPage = memo(() => {
  const data = useLoaderData() as {
    documentUrl: Promise<string>;
    order: Promise<Order>;
  };
  const { orderId } = useParams();
  const translations = useTranslatedText(phrases);
  const translationKeys = useTranslationKeys(phrases);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const documentType = 'ORDER_CONFIRMATION';

  const handleSubmit = useCallback(
    async (email?: string) => {
      setIsSubmitting(true);
      const result = await sendDocumentByOrderId(
        orderId!,
        documentType,
        translationKeys.errorDescription
      );
      if (result) {
        navigate(sibling(paths.root.orders.order.actions.success.path), {
          state: {
            mainText: translations.mainText,
            subText: translations.subText({ email }),
          },
        });
        posthog.capture('Order confirmation sent', {
          orderId,
          documentType,
        });
      } else {
        setIsSubmitting(false);
      }
    },
    [orderId, navigate, translations, translationKeys]
  );

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await
          errorElement={<ErrorPage description={translations.errorDescription} />}
          resolve={Promise.all([data.documentUrl, data.order])}
        >
          {([documentUrl, order]: [string, Order]) => (
            <div css={pageStyle}>
              <Typography variant="h2">{translations.podPreview}</Typography>
              <div css={documentStyle}>
                <PdfViewer pdfUrl={documentUrl} />
              </div>
              <Typography css={disclaimerStyle} variant="body1">
                {translations.disclaimer}
              </Typography>
              <LoadingButton
                css={{ flexShrink: 0 }}
                loading={isSubmitting}
                onClick={() =>
                  handleSubmit(
                    order.orderDetails?.customerInformation.contacts?.dispositionContact
                      ?.contactDetails?.email
                  )
                }
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

export const SendOrderConfirmationRoute: RouteObject[] = [
  {
    path: path(paths.root.orders.order.actions.orderConfirmation.path, ':documentId'),
    element: <SendOrderConfirmationPage />,
    loader: ({ params }) =>
      defer({
        documentUrl: getAndWaitForDocumentUrlById(params.orderId!, params.documentId!),
        order: getOrderById(params.orderId!),
      }),
  },
];
