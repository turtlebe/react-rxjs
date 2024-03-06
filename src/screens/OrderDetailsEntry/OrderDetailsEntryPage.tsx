import { memo, useMemo } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useOrderFormApiConnector } from 'hooks/userOrderFormApiConnector';
import { parent, path, paths } from 'paths';
import { getMappedOrderObservable, updateOrderDetails } from '../../state/order-details.state';
import { OrderDetailsFormValues } from './types';
import { OrderDetailsForm } from './OrderDetailsForm';
import {
  detailsFormApiToOrderDetailsMapper,
  orderToDetailsFormApiMapper,
} from './OrderDetailsFormMappers';

const phrases = (t: TranslateFn) => ({
  title: t('Order details'),
});

export const OrderDetailsEntryPage = memo(() => {
  const { orderId } = useParams();
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();

  const getFormData = useMemo(
    () => () => getMappedOrderObservable(orderId!, orderToDetailsFormApiMapper),
    [orderId]
  );
  const sendFormData = useMemo(
    () => (data: OrderDetailsFormValues) =>
      updateOrderDetails(data.originalOrder!, detailsFormApiToOrderDetailsMapper(data)),
    []
  );

  const { initialValues, loading, submitData } = useOrderFormApiConnector(
    getFormData,
    sendFormData,
    () => navigate(parent(paths.root.orders.order.path, orderId!))
  );

  return (
    <ForestHeaderPage
      title={translations.title}
      onBack={() => navigate(-1)}
      onClose={() => navigate(-1)}
    >
      <OrderDetailsForm initialValues={initialValues} loading={loading} onSubmit={submitData} />
    </ForestHeaderPage>
  );
});

export const EditOrderRoute: RouteObject[] = [
  {
    element: <OrderDetailsEntryPage />,
    path: path(paths.root.orders.order.edit.orderDetails.path),
  },
];
