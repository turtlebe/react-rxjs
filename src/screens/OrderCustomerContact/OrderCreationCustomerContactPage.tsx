import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import posthog from 'posthog-js';
import { Typography } from 'components/Typography';
import { CardSection } from 'components/Card';
import { ColumnLayout, ForestHeaderPage } from 'components/Page';
import { Alert } from 'components/Snackbar';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { loadCustomerCompanyDetails, useCustomerCompanyDetails } from 'state/customers';
import { PENDING } from 'state';
import { paths, sibling } from 'paths';
import { EditButton } from 'screens/PaymentsFinalConfirmation/EditButton';
import { createOrUpdateCustomerContact } from '../../state/customer/customer-contacts.state';
import { CreateOrderRequest } from '../../api/orders.api';
import { createOrder } from '../../state/orders.state';
import { OrderCustomerContactForm } from './OrderCustomerContactForm';
import { mapCustomerContactsFromFormValues, OrderCustomerContactFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Customer contacts'),
  yourCustomer: t('Your customer'),
  warningLabel: t(
    'This customer has a very low creditworthiness rating. You can continue to request the payment but there’s a high chance that the receivable will not be accepted.'
  ),
});

export const OrderCreationCustomerContactPage = memo(() => {
  const translations = useTranslatedText(phrases);
  const customerCompanyDetails = useCustomerCompanyDetails();
  const navigate = useNavigate();
  const { customerId } = useParams();

  const handleSubmit = useCallback(
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
      }

      const createOrderRequest: CreateOrderRequest = {
        customerId: customerId!,
        contacts,
      };

      const newOrderId = await createOrder(createOrderRequest);
      if (newOrderId) {
        navigate(sibling(paths.root.orders.order.path, newOrderId, 'order-details'));
        posthog.capture('Order created', {
          orderId: newOrderId,
          customer:
            data.originalOrder?.orderDetails?.customerInformation.customerCompany?.companyName,
        });
      }
    },
    [customerId, navigate]
  );

  useEffect(() => {
    loadCustomerCompanyDetails(customerId!);
  }, [customerId]);

  return (
    // CTFU: De-duplicate code between this page and the update order contact version
    <ForestHeaderPage title={translations.title} onBack={() => navigate(-1)}>
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
            <CardSection
              title={translations.yourCustomer}
              rightHeaderElement={
                <EditButton to={sibling(paths.root.orders.order.create.customerSelection.path)} />
              }
            >
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
          <OrderCustomerContactForm onSubmit={handleSubmit} />
        </div>
      )}
    </ForestHeaderPage>
  );
});
