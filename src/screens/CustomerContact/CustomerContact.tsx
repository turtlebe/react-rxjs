import { memo, useEffect, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { Card } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { loadCustomerCompanyDetails, useCustomerCompanyDetails } from 'state/customers';
import { PENDING } from 'state';
import { countries } from 'ref-data/countries';
import { Warning } from 'theme/icons/Warning';
import { getCustomerContactForm, sendCustomerContactForm } from 'state/payments';
import { CustomerContactFormValues } from 'screens/CustomerContact/types';
import { CustomerContactForm } from './CustomerContactForm';

const phrases = (t: TranslateFn) => ({
  title: t('Customer contact'),
  description: t(
    'Please provide the bookkeeping contact for your customer. This will be the recipient for the invoice.'
  ),
  yourCustomer: t('Your customer'),
  warningLabel: t(
    'This customer has a very low creditworthiness rating. You can continue to request the payment but there’s a high chance that the receivable will not be accepted.'
  ),
  contactBookkeeping: t('Contact bookkeeping'),
});

const warningStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    gap: theme.spacing(0.625),
    margin: theme.spacing(2.5, 0),
    border: `${theme.spacing(0.0625)} solid ${theme.palette.error.main}25`,
    boxShadow: `0px 0px ${theme.spacing(0.5)} 0px ${theme.palette.error.main}25`,
    backgroundColor: theme.palette.error.faded,
  });

const wrapperStyle = (theme: Theme) =>
  css({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  });

export const CustomerContact = memo(() => {
  const translations = useTranslatedText(phrases);
  const companyDetails = useCustomerCompanyDetails();
  const { customerId, paymentId } = useParams();
  const getFormData = useMemo(() => () => getCustomerContactForm(paymentId!), [paymentId]);
  const sendFormData = useMemo(
    () => (data: CustomerContactFormValues) => sendCustomerContactForm(paymentId!, data),
    [paymentId]
  );
  const { initialValues, loading, submitData } = useFormApiConnector(
    'customer-contact',
    getFormData,
    sendFormData
  );

  useEffect(() => {
    loadCustomerCompanyDetails(customerId!);
  }, [customerId]);

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      {companyDetails && companyDetails !== PENDING && (
        <div css={wrapperStyle}>
          <Typography variant="h2">{translations.yourCustomer}</Typography>
          <Card css={(theme) => ({ marginTop: theme.spacing(1.25), flexShrink: 0 })}>
            <Typography variant="body2">{`${companyDetails.form.companyName} ${
              countries[companyDetails.form.country!]
            }`}</Typography>
            <Typography variant="body2">{companyDetails.form.streetAndNumber}</Typography>
            <Typography variant="body2">{companyDetails.form.postcode}</Typography>
            <Typography variant="body2">{companyDetails.form.city}</Typography>
          </Card>
          {companyDetails.creditWorthiness === 'low' && (
            <Card css={warningStyle}>
              <Warning
                css={(theme) => ({
                  color: theme.palette.error.main,
                  width: theme.spacing(3.75),
                  height: theme.spacing(3.75),
                })}
              />
              <Typography css={{ flex: 1 }} variant="body2">
                {translations.warningLabel}
              </Typography>
            </Card>
          )}
          <Typography variant="h2">{translations.contactBookkeeping}</Typography>
          <CustomerContactForm
            initialValues={initialValues}
            loading={loading}
            onSubmit={submitData}
          />
        </div>
      )}
    </WorkflowLayoutContent>
  );
});
