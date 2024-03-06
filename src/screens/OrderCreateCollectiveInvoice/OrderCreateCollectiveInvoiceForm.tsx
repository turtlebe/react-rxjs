import { memo, useCallback, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { MenuItem, Select } from '@mui/material';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { Option } from 'components/types';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import {
  BookKeepingContactIdFormField,
  NumberFormField,
  TextFormField,
} from 'screens/shared/FormFields';
import { CompanySummary } from 'api/types';
import { loadCustomerCompanyDetails } from 'state/customers';
import { VatRateFormField } from 'screens/shared/FormFields/VatRateFormField';
import { useOrderCreateCollectiveInvoiceFormSchema } from './useOrderCreateCollectiveInvoiceFormSchema';
import { CollectiveInvoiceOrder, CreateCollectiveInvoiceFormValues } from './types';
import { SelectOrderTable } from './SelectOrderTable';

const phrases = (t: TranslateFn) => ({
  confirmButton: t('Create invoice preview'),
  customer: t('Customer'),
  customerName: t('Customer name'),
  bookkeepingContact: t('Bookkeeping contact'),
  invoiceDetails: t('Invoice details'),
  invoiceNumberLabel: t('Invoice number'),
  selectOrders: t('Select orders for the collective invoice'),
  paymentTermLabel: t('Payment terms'),
  days: t('days'),
});

const tempOrders = [
  {
    customerId: 'customer2',
    customerName: 'Test Customer 2',
    deliveryDate: '2022-08-11T00:00:00.000Z',
    from: 'Berlin',
    missingData: ['Services missing'],
    orderNumber: 'T12341',
    to: 'Munich',
  },
  {
    customerId: 'customer3',
    customerName: 'Test Customer 3',
    deliveryDate: '2022-08-11T00:00:00.000Z',
    from: 'Berlin',
    missingData: ['Services missing'],
    orderNumber: 'T12343',
    to: 'Munich',
  },
  {
    customerId: 'customer1',
    customerName: 'Test Customer 1',
    deliveryDate: '2022-08-11T00:00:00.000Z',
    from: 'Berlin',
    missingData: ['Services missing'],
    orderNumber: 'T12341',
    to: 'Munich',
  },
];

export interface OrderCreateCollectiveInvoiceFormProps
  extends FormComponentProps<CreateCollectiveInvoiceFormValues> {
  prevCompanies?: CompanySummary[];
}

const DEFAULT_PREV_CUSTOMER_OPTIONS: Option[] = [];

const formStyle = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      flexGrow: 1,
    },
  });

const selectStyle = (theme: Theme) =>
  css({
    color: theme.palette.text.secondary,
    margin: theme.spacing(1, 0, 2),
    '& > .MuiSelect-select': {
      padding: `${theme.spacing(1, 1.5)}!important`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.text.primary}!important`,
    },
  });

export const OrderCreateCollectiveInvoiceForm = memo(
  (props: OrderCreateCollectiveInvoiceFormProps) => {
    const { loading, onSubmit, prevCompanies } = props;
    const translations = useTranslatedText(phrases);
    const schema = useOrderCreateCollectiveInvoiceFormSchema();
    const [selectedOrders, setSelectedOrders] = useState<CollectiveInvoiceOrder[]>([]);

    const api = useForm<CreateCollectiveInvoiceFormValues>({
      defaultValues: undefined,
      initialValues: undefined,
      schema,
    });

    const prevCompanyOptions: Option[] = prevCompanies?.length
      ? prevCompanies.map(({ companyId, companyName }) => ({
          label: companyName,
          value: companyId,
        }))
      : DEFAULT_PREV_CUSTOMER_OPTIONS;

    const handleSelectOrder = useCallback(
      (order: CollectiveInvoiceOrder) => {
        if (selectedOrders?.includes(order)) {
          setSelectedOrders(selectedOrders.filter((item) => item !== order));
        } else {
          setSelectedOrders([...selectedOrders, order]);
        }
      },
      [selectedOrders]
    );

    return (
      <Form
        heightAuto
        api={api}
        css={formStyle}
        flowDirection="one-column"
        loading={loading}
        submitLabel={translations.confirmButton}
        onSubmit={onSubmit}
      >
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1) })} variant="h3">
          {translations.customer}
        </Typography>
        <Select
          displayEmpty
          css={selectStyle}
          disabled={prevCompanyOptions.length === 0}
          onChange={(e) => {
            loadCustomerCompanyDetails(e.target.value as string);
          }}
        >
          {prevCompanyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <BookKeepingContactIdFormField />
        <Typography variant="h3">{translations.invoiceDetails}</Typography>
        <TextFormField label={translations.invoiceNumberLabel} name="invoiceNumber" />
        <NumberFormField
          label={translations.paymentTermLabel}
          name="paymentTermDays"
          unit={translations.days}
        />
        <VatRateFormField />
        <Typography variant="h3">{translations.selectOrders}</Typography>
        <SelectOrderTable
          handleSelectOrder={handleSelectOrder}
          orders={tempOrders}
          selectedOrders={selectedOrders}
        />
      </Form>
    );
  }
);
