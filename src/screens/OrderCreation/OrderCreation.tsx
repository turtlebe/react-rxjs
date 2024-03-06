import { Suspense } from 'react';
import { Await, defer, RouteObject, useLoaderData } from 'react-router-dom';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { path, paths } from 'paths';
import { OrderCreationCustomerContactPage } from 'screens/OrderCustomerContact';
import { CreateOrderCustomerSelectionPage } from 'screens/OrderCustomerSelection';
import { OrderCreationNewCustomerEntryPage } from 'screens/OrderCreationNewCustomerEntryPage';
import { getPreviousCompanies } from 'state/customers';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { CompanySummary } from 'api/types';
import { ErrorPage } from 'screens/ErrorPage';

const phrases = (t: TranslateFn) => ({
  customerSelectionLabel: t('Customer selection'),
  customerContactLabel: t('Customer contact'),
  orderDetailsLabel: t('Order details'),
  errorNewWorkflow: t('An error occurred when initializing a new order workflow.'),
  errorLoadingWorkflow: t('An error occurred loading the order workflow.'),
  retry: t('Retry'),
  backToOrderbook: t('Back to the order book'),
});

const OrderCreationError = () => {
  const translations = useTranslatedText(phrases);

  return <ErrorPage description={translations.errorLoadingWorkflow} />;
};

const OrderCreationCustomerSelectionLoader = () => {
  const data = useLoaderData() as { prevCompanies: Promise<CompanySummary[]> };
  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<OrderCreationError />} resolve={data.prevCompanies}>
        {(prevCompanies: CompanySummary[]) => (
          <CreateOrderCustomerSelectionPage prevCompanies={prevCompanies} />
        )}
      </Await>
    </Suspense>
  );
};

export const OrderCreationRoutes: RouteObject[] = [
  {
    path: path(paths.root.orders.order.path, 'error'),
    element: <OrderCreationError />,
  },
  {
    element: <OrderCreationCustomerSelectionLoader />,
    path: path(paths.root.orders.order.create.customerSelection.path),
    errorElement: <OrderCreationError />,
    loader: () => defer({ prevCompanies: getPreviousCompanies() }),
  },
  {
    element: <OrderCreationNewCustomerEntryPage />,
    path: path(paths.root.orders.order.create.newCustomer.path),
  },
  {
    element: <OrderCreationCustomerContactPage />,
    path: path(paths.root.orders.order.create.customerContacts.path, ':customerId'),
  },
];
