import { memo, Suspense } from 'react';
import {
  Await,
  defer,
  Navigate,
  Outlet,
  redirect,
  RouteObject,
  useLoaderData,
} from 'react-router-dom';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { ShareOrderRoute } from 'screens/ShareOrder/ShareOrderPage';
import { SendPodRoute } from 'screens/SendPod/SendPodPage';
import { RecordPaymentRoute } from 'screens/RecordOrderPayment/RecordPaymentPage';
import { SentSuccessRoute } from 'screens/shared/SentSuccess/SentSuccess';
import { fromRoot, path, paths, sibling } from 'paths';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { Order } from 'api/types';
import { getOrderById } from 'state/orders';
import { WorkflowError } from 'screens/shared/Workflow';
import { SendOrderConfirmationRoute } from 'screens/SendOrderConfirmation/SendOrderConfirmation';
import { UploadPodRoute } from 'screens/OrderUploadPOD/OrderUploadPodPage';
import { UploadCreditNoteRoute } from 'screens/OrderUploadCreditNote/OrderUploadCreditNotePage';
import { CreateInvoiceRoute } from 'screens/OrderCreateInvoice/OrderCreateInvoicePage';
import { SendInvoiceRoute } from 'screens/SendInvoice/SendInvoicePage';
import { UploadOrderRoute } from 'screens/OrderUploadOrder/OrderUploadOrderPage';
import { OrderMain } from 'screens/shared/Order';
import { EditOrderRoute } from 'screens/OrderDetailsEntry';
import { EditCustomerContactRoute } from 'screens/OrderCustomerContact/EditCustomerContactPage';

const phrases = (t: TranslateFn) => ({
  title: t('Order overview'),
  errorLoadingOrder: t('An error occurred loading the order.'),
  backToOrderBook: t('Back to the order book'),
});

const OrderError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <Navigate
      replace
      to={sibling(paths.root.orders.order.path, 'error')}
      state={{
        description: translations.errorLoadingOrder,
        actionText: translations.backToOrderBook,
        to: fromRoot(paths.root.orders.path),
      }}
    />
  );
};

export const OrderPage = memo(() => {
  const data = useLoaderData() as { order: Promise<Order> };
  const translations = useTranslatedText(phrases);

  return (
    <ForestHeaderPage title={translations.title}>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await errorElement={<OrderError />} resolve={data.order}>
          {(order: Order) => (
            <OrderMain
              order={order}
              hideEdit={
                order.orderDetails?.status !== 'CREATED' &&
                order.orderDetails?.status !== 'DELIVERED'
              }
            />
          )}
        </Await>
      </Suspense>
    </ForestHeaderPage>
  );
});

export const OrderRoutes: RouteObject[] = [
  {
    path: paths.root.orders.order.path,
    loader: () => redirect(fromRoot(paths.root.orders.path)),
  },
  {
    path: path(paths.root.orders.order.path, 'error'),
    element: <WorkflowError />,
  },
  {
    path: path(paths.root.orders.order.path, ':orderId'),
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <OrderPage />,
        errorElement: <OrderError />,
        loader: ({ params }) => defer({ order: getOrderById(params.orderId!) }),
      },
      ...EditOrderRoute,
      ...EditCustomerContactRoute,
      ...ShareOrderRoute,
      ...UploadOrderRoute,
      ...UploadPodRoute,
      ...SendPodRoute,
      ...RecordPaymentRoute,
      ...SentSuccessRoute,
      ...SendOrderConfirmationRoute,
      ...UploadCreditNoteRoute,
      ...CreateInvoiceRoute,
      ...SendInvoiceRoute,
    ],
  },
];
