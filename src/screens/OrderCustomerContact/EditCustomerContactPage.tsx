import { memo, useCallback, useEffect, useMemo } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { CardSection } from 'components/Card';
import { ColumnLayout, ForestHeaderPage } from 'components/Page';
import { Alert } from 'components/Snackbar';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { loadCustomerCompanyDetails, useCustomerCompanyDetails } from 'state/customers';
import { PENDING } from 'state';
import { path, paths, sibling } from 'paths';
import { getMappedOrderObservable, updateOrderDetails } from '../../state/order-details.state';
import { Order, OrderDetails } from '../../api/types';
import { anyChildExistsOrUndefined } from '../../utils/api';
import { useOrderFormApiConnector } from '../../hooks/userOrderFormApiConnector';
import { createOrUpdateCustomerContact } from '../../state/customer/customer-contacts.state';
import { OrderCustomerContactForm } from './OrderCustomerContactForm';
import { mapCustomerContactsFromFormValues, OrderCustomerContactFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Customer contacts'),
  yourCustomer: t('Your customer'),
  warningLabel: t(
    'This customer has a very low creditworthiness rating. You can continue to request the payment but there’s a high chance that the receivable will not be accepted.'
  ),
});

const mapOrderToFormValues = (
  order: Order | undefined
): OrderCustomerContactFormValues | undefined => {
  if (order?.orderDetails?.customerInformation?.contacts) {
    const { contacts } = order.orderDetails.customerInformation;
    return {
      originalOrder: order,
      bookKeepingContactId: contacts.bookkeepingContact?.contactId,
      bookKeepingContactName: contacts.bookkeepingContact?.contactName,
      bookKeepingEmail: contacts.bookkeepingContact?.contactDetails?.email,
      bookKeepingPhoneNumber: contacts.bookkeepingContact?.contactDetails?.phoneNumber,

      dispositionContactId: contacts.dispositionContact?.contactId,
      dispositionContactName: contacts.dispositionContact?.contactName,
      dispositionEmail: contacts.dispositionContact?.contactDetails?.email,
      dispositionPhoneNumber: contacts.dispositionContact?.contactDetails?.phoneNumber,
    };
  }
  return { originalOrder: order };
};

const customerContactFormToOrderDetailsMapper = (
  data: OrderCustomerContactFormValues
): Partial<OrderDetails> => {
  const contacts = mapCustomerContactsFromFormValues(data);
  return {
    customerInformation: anyChildExistsOrUndefined({
      contacts,
    }),
  };
};

export const EditCustomerContactPage = memo(() => {
  const translations = useTranslatedText(phrases);
  const customerCompanyDetails = useCustomerCompanyDetails();
  const navigate = useNavigate();
  const { customerId, orderId } = useParams();

  useEffect(() => {
    loadCustomerCompanyDetails(customerId!);
  }, [customerId]);

  const getFormData = useMemo(
    () => () => getMappedOrderObservable(orderId!, mapOrderToFormValues),
    [orderId]
  );

  const sendFormData = useMemo(
    () => (data: OrderCustomerContactFormValues) =>
      updateOrderDetails(data.originalOrder!, customerContactFormToOrderDetailsMapper(data)),
    []
  );

  const { initialValues, loading, submitData } = useOrderFormApiConnector(
    getFormData,
    sendFormData,
    () => navigate(sibling(paths.root.orders.order.edit.orderDetails.path))
  );

  const onSubmit = useCallback(
    async (data: OrderCustomerContactFormValues) => {
      const contacts = mapCustomerContactsFromFormValues(data);
      if (contacts) {
        contacts.bookkeepingContact = await createOrUpdateCustomerContact(
          customerId!,
          contacts.bookkeepingContact
        );
        contacts.dispositionContact = await createOrUpdateCustomerContact(
          customerId!,
          contacts.dispositionContact
        );
        // eslint-disable-next-line no-param-reassign
        data.bookKeepingContactId = contacts.bookkeepingContact?.contactId;
        // eslint-disable-next-line no-param-reassign
        data.dispositionContactId = contacts.dispositionContact?.contactId;
      }

      return submitData(data);
    },
    [submitData, customerId]
  );

  return (
    // CTFU: De-duplicate code between this page and the update order contact version
    <ForestHeaderPage
      title={translations.title}
      onBack={() => navigate(-1)}
      onClose={() => navigate(-1)}
    >
      {customerCompanyDetails && customerCompanyDetails !== PENDING && (
        <div>
          <ColumnLayout
            css={(theme) => ({
              marginBottom: theme.spacing(1),
              [theme.breakpoints.down('md')]: {
                marginBottom: theme.spacing(1),
              },
            })}
          >
            <CardSection title={translations.yourCustomer}>
              <Typography variant="body2">{customerCompanyDetails.form.companyName}</Typography>
              <Typography variant="body2">{customerCompanyDetails.form.streetAndNumber}</Typography>
              <Typography variant="body2">
                {customerCompanyDetails.form.postcode} {customerCompanyDetails.form.city}
              </Typography>
            </CardSection>
            {customerCompanyDetails.creditWorthiness === 'low' && (
              <Alert
                severity="error"
                css={(theme) => ({
                  marginBottom: theme.spacing(2),
                })}
              >
                {translations.warningLabel}
              </Alert>
            )}
          </ColumnLayout>
          <OrderCustomerContactForm
            initialValues={initialValues}
            loading={loading}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </ForestHeaderPage>
  );
});

export const EditCustomerContactRoute: RouteObject[] = [
  {
    element: <EditCustomerContactPage />,
    path: path(paths.root.orders.order.edit.customerContacts.path, ':customerId'),
  },
];
