import { memo, Suspense, useCallback } from 'react';
import {
  Await,
  defer,
  Navigate,
  redirect,
  RouteObject,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { Page } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, parent, path, paths, sibling } from 'paths';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PaymentRequestDetail } from 'api/types';
import { WorkflowError } from 'screens/shared/Workflow';
import { getPaymentRequestById } from 'state/payments';
import { PaymentRequestDetails } from './PaymentRequestDetails';

const phrases = (t: TranslateFn) => ({
  errorLoadingPayment: t('An error occurred loading the payment request.'),
  backToDashboard: t('Back to the payment dashboard'),
});

const PaymentRequestError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <Navigate
      replace
      to={sibling(paths.root.factoring.payment.path, 'error')}
      state={{
        description: translations.errorLoadingPayment,
        actionText: translations.backToDashboard,
        to: fromRoot(paths.root.factoring.path),
      }}
    />
  );
};

export const PaymentRequestPage = memo(() => {
  const data = useLoaderData() as { request: Promise<PaymentRequestDetail> };
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('../');
  }, [navigate]);

  return (
    <Page onClose={handleClose}>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await errorElement={<PaymentRequestError />} resolve={data.request}>
          {(request: PaymentRequestDetail) => {
            if (request.status === 'DRAFT') {
              return (
                <Navigate
                  replace
                  to={parent(paths.root.factoring.createPayment.path, request.requestId)}
                />
              );
            }

            return <PaymentRequestDetails paymentRequest={request} />;
          }}
        </Await>
      </Suspense>
    </Page>
  );
});

export const PaymentRoutes: RouteObject[] = [
  {
    path: paths.root.factoring.payment.path,
    loader: () => redirect(fromRoot(paths.root.factoring.path)),
  },
  {
    path: path(paths.root.factoring.payment.path, 'error'),
    element: <WorkflowError />,
  },
  {
    path: path(paths.root.factoring.payment.path, ':id'),
    element: <PaymentRequestPage />,
    errorElement: <PaymentRequestError />,
    loader: ({ params }) => defer({ request: getPaymentRequestById(params.id!) }),
  },
];
