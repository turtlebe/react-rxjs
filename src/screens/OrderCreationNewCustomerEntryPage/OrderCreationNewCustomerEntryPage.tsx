import { memo, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { of } from 'rxjs';
import { Typography } from '@mui/material';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useOrderFormApiConnector } from 'hooks/userOrderFormApiConnector';
import { getOrderCustomerInformationForm, sendNewOrderCustomerInformationForm } from 'state/orders';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { CustomerInformationForm } from 'screens/shared/CustomerInformationForm';
import { paths, sibling } from 'paths';

const phrases = (t: TranslateFn) => ({
  title: t('New Customer'),
  description: t('Please enter the details of the new customer.'),
});

export const OrderCreationNewCustomerEntryPage = memo(() => {
  const translations = useTranslatedText(phrases);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const getFormData = useMemo(
    () => () => orderId ? getOrderCustomerInformationForm(orderId) : of(undefined),
    [orderId]
  );

  const sendFormData = useMemo(
    () => (data: CustomerInformationFormValues) => sendNewOrderCustomerInformationForm(data),
    []
  );

  const { initialValues, loading, submitData } = useOrderFormApiConnector(
    getFormData,
    sendFormData,
    (id?: string) =>
      navigate(sibling(`${paths.root.orders.order.create.customerContacts.path}/${id}`))
  );

  return (
    <ForestHeaderPage title={translations.title} onBack={() => navigate(-1)}>
      <Typography
        variant="body1"
        css={(theme) => ({
          marginBottom: theme.spacing(2),
        })}
      >
        {translations.description}
      </Typography>
      <CustomerInformationForm
        initialValues={initialValues}
        loading={loading}
        onSubmit={submitData}
      />
    </ForestHeaderPage>
  );
});
