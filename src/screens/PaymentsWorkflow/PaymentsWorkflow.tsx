import { Suspense, useCallback, useMemo } from 'react';
import { Await, Navigate, RouteObject, useLoaderData, useNavigate, defer } from 'react-router-dom';
import { BreadcrumbItems } from 'components/Breadcrumbs';
import { useWorkflow } from 'hooks/useWorkflow';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, parent, path, paths, sibling } from 'paths';
import { WorkflowError, WorkflowLayout } from 'screens/shared/Workflow';
import { PaymentDetailsEntry } from 'screens/PaymentDetailsEntry';
import { UploadPaymentDocsEntry } from 'screens/UploadPaymentDocsEntry';
import { WorkflowStatus } from 'api/types';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { getCreatePaymentStatus, getNewCreatePaymentId } from 'state/payments';
import { PaymentsFinalConfirmation } from 'screens/PaymentsFinalConfirmation';
import { CustomerSelection } from 'screens/CustomerSelection';
import { CustomerInformationEntry } from 'screens/CustomerInformationEntry';
import { CustomerContact } from 'screens/CustomerContact';
import { getPreviousCompanies } from 'state/customers';
import { ErrorPage } from 'screens/ErrorPage';
import { PaymentSubmitted } from './PaymentSubmitted';

const phrases = (t: TranslateFn) => ({
  customerSelectionLabel: t('Customer selection'),
  customerContactLabel: t('Customer contact'),
  paymentDetailsLabel: t('Payment details'),
  uploadDocumentsLabel: t('Upload documents'),
  errorNewWorkflow: t('An error occurred when initializing a new payment workflow.'),
  errorLoadingWorkflow: t('An error occurred loading the payment workflow.'),
  retry: t('Retry'),
  backToDashboard: t('Back to the payment dashboard'),
});

export const PaymentsWorkflow = (props: { paymentStatus: WorkflowStatus }) => {
  const {
    paymentStatus: { progress },
  } = props;
  const translations = useTranslatedText(phrases);

  const breadcrumbs = useMemo(
    (): BreadcrumbItems => [
      {
        label: translations.customerSelectionLabel,
        path: paths.root.factoring.createPayment.customerSelection.path,
      },
      {
        label: translations.customerContactLabel,
        path: paths.root.factoring.createPayment.customerContact.path,
      },
      {
        label: translations.paymentDetailsLabel,
        path: paths.root.factoring.createPayment.paymentDetails.path,
      },
      {
        label: translations.uploadDocumentsLabel,
        path: paths.root.factoring.createPayment.uploadDocuments.path,
      },
    ],
    [translations]
  );

  const { WorkflowProvider } = useWorkflow({ breadcrumbs, initialProgress: progress });
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(fromRoot(paths.root.factoring.path));
  }, [navigate]);

  return (
    <WorkflowProvider>
      <WorkflowLayout onClose={handleClose} />
    </WorkflowProvider>
  );
};

const PaymentsWorkflowError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <Navigate
      to={sibling(paths.root.factoring.createPayment.path, 'error')}
      state={{
        description: translations.errorLoadingWorkflow,
        actionText: translations.backToDashboard,
        to: fromRoot(paths.root.factoring.path),
      }}
    />
  );
};

const CustomerSelectionError = () => {
  const translations = useTranslatedText(phrases);

  return <ErrorPage description={translations.errorLoadingWorkflow} />;
};

const PaymentsWorkflowLoader = () => {
  const data = useLoaderData() as { paymentStatus: Promise<WorkflowStatus> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<PaymentsWorkflowError />} resolve={data.paymentStatus}>
        {(paymentStatus: WorkflowStatus) => {
          if (paymentStatus.status === 'complete') {
            return <Navigate replace to={parent(paths.root.factoring.path)} />;
          }

          return <PaymentsWorkflow paymentStatus={paymentStatus} />;
        }}
      </Await>
    </Suspense>
  );
};

const NewPaymentWorkflowError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <Navigate
      replace
      to="error"
      state={{
        description: translations.errorNewWorkflow,
        actionText: translations.retry,
        to: sibling(paths.root.factoring.createPayment.path),
      }}
    />
  );
};

const NewPaymentWorkflowLoader = () => {
  const data = useLoaderData() as { id: Promise<string> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<NewPaymentWorkflowError />} resolve={data.id}>
        {(id: string) => (
          <Navigate replace to={sibling(`${paths.root.factoring.createPayment.path}/${id}`)} />
        )}
      </Await>
    </Suspense>
  );
};

export const PaymentsWorkflowRoutes: RouteObject[] = [
  {
    path: paths.root.factoring.createPayment.path,
    element: <NewPaymentWorkflowLoader />,
    errorElement: <NewPaymentWorkflowError />,
    loader: () => defer({ id: getNewCreatePaymentId() }),
  },
  {
    path: path(paths.root.factoring.createPayment.path, 'error'),
    element: <WorkflowError />,
  },
  {
    path: path(paths.root.factoring.createPayment.path, ':paymentId', ':customerId?'),
    element: <PaymentsWorkflowLoader />,
    errorElement: <PaymentsWorkflowError />,
    loader: ({ params }) => defer({ paymentStatus: getCreatePaymentStatus(params.paymentId!) }),
    children: [
      {
        element: <CustomerSelection />,
        path: paths.root.factoring.createPayment.customerSelection.path,
        handle: {
          index: 0,
          next: paths.root.factoring.createPayment.customerContact.path,
        },
        errorElement: <CustomerSelectionError />,
        loader: () => defer({ prevCompanies: getPreviousCompanies() }),
      },
      {
        element: <CustomerInformationEntry />,
        path: paths.root.factoring.createPayment.newCustomer.path,
        handle: {
          index: 0,
          next: paths.root.factoring.createPayment.customerContact.path,
          previous: paths.root.factoring.createPayment.customerSelection.path,
        },
      },
      {
        element: <CustomerContact />,
        path: paths.root.factoring.createPayment.customerContact.path,
        handle: {
          index: 1,
          next: paths.root.factoring.createPayment.paymentDetails.path,
          previous: paths.root.factoring.createPayment.customerSelection.path,
        },
      },
      {
        element: <PaymentDetailsEntry />,
        path: paths.root.factoring.createPayment.paymentDetails.path,
        handle: {
          index: 2,
          next: paths.root.factoring.createPayment.uploadDocuments.path,
          previous: paths.root.factoring.createPayment.customerContact.path,
        },
      },
      {
        element: <UploadPaymentDocsEntry />,
        path: paths.root.factoring.createPayment.uploadDocuments.path,
        handle: {
          index: 3,
          next: paths.root.factoring.createPayment.confirmation.path,
          previous: paths.root.factoring.createPayment.paymentDetails.path,
        },
      },
      {
        element: <PaymentsFinalConfirmation />,
        path: paths.root.factoring.createPayment.confirmation.path,
        handle: {
          index: 4,
          next: paths.root.factoring.createPayment.paymentSubmitted.path,
          previous: paths.root.factoring.createPayment.uploadDocuments.path,
        },
      },
    ],
  },
  {
    element: <PaymentSubmitted />,
    path: `${paths.root.factoring.createPayment.path}/:paymentId/${paths.root.factoring.createPayment.paymentSubmitted.path}`,
  },
];
