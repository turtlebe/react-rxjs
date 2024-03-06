import { memo, useCallback, useState, Suspense } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useLoaderData, useParams, RouteObject, defer, Await } from 'react-router-dom';
import { ForestHeaderPage } from 'components/Page';
import { Typography } from 'components/Typography';
import { PdfViewer } from 'components/PdfViewer';
import { TranslateFn, useTranslatedText, useTranslationKeys } from 'hooks/useTranslatedText';
import { sendDocumentByOrderId, getAndWaitForDocumentUrlById } from 'state/orders';
import { ErrorPage } from 'screens/ErrorPage';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { path, paths, sibling } from 'paths';
import { LoadingButton } from 'components/Button/LoadingButton';

const phrases = (t: TranslateFn) => ({
  title: t('Send proof of delivery'),
  podPreview: t('POD preview'),
  disclaimer: t(
    'With a click on “Send POD” we will send the proof of delivery via email to your customer (bookkeeping contact). You will of course be in CC on that email.'
  ),
  sendButton: t('Send POD'),
  mainText: t('Proof of delivery successfully sent!'),
  subText: t('We have sent the proof of delivery via email.'),
  errorDescription: t('There was an error sending the POD.'),
});

const pageStyle = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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

export const SendPodPage = memo(() => {
  const data = useLoaderData() as { documentUrl: Promise<string> };
  const params = useParams();
  const translations = useTranslatedText(phrases);
  const translationsKeys = useTranslationKeys(phrases);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const documentType = 'PROOF_OF_DELIVERY';

  const handleSubmit = useCallback(async () => {
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
          subText: translations.subText,
        },
      });
    } else {
      setIsSubmitting(false);
    }
  }, [params, navigate, translations, translationsKeys]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await
          errorElement={<ErrorPage description={translations.errorDescription} />}
          resolve={data.documentUrl}
        >
          {(documentUrl: string) => (
            <div css={pageStyle}>
              <Typography variant="h2">{translations.podPreview}</Typography>
              <div css={documentStyle}>
                <PdfViewer pdfUrl={documentUrl} />
              </div>
              <Typography css={disclaimerStyle} variant="body1">
                {translations.disclaimer}
              </Typography>
              <LoadingButton css={{ flexShrink: 0 }} loading={isSubmitting} onClick={handleSubmit}>
                {translations.sendButton}
              </LoadingButton>
            </div>
          )}
        </Await>
      </Suspense>
    </ForestHeaderPage>
  );
});

export const SendPodRoute: RouteObject[] = [
  {
    path: path(paths.root.orders.order.actions.sendPod.path, ':documentId'),
    element: <SendPodPage />,
    loader: ({ params }) =>
      defer({ documentUrl: getAndWaitForDocumentUrlById(params.orderId!, params.documentId!) }),
  },
];
