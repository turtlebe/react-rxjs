import { memo, useMemo } from 'react';
import { startOfDay } from 'date-fns';
import { Card } from 'components/Card';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { ClearingSystemOptions } from 'ref-data/misc';
import {
  CountryFormField,
  CurrencyFormField,
  DateFormField,
  NumberFormField,
  RadioGroupFormField,
  TextFormField,
} from 'screens/shared/FormFields';
import { FormComponentProps } from 'screens/shared/types';
import { CountryCode } from 'ref-data/countries';
import { PaymentDetailsFormValues } from './types';
import { usePaymentDetailsFormSchema } from './usePaymentDetailsFormSchema';

const phrases = (t: TranslateFn) => ({
  nextLabel: t('Next'),
  countryLabel: t('Applicable law'),
  clearingSystemTitle: t('Clearing system'),
  clearingSystemSubtitle: t('Do you want to factor an invoice or a credit note?'),
  invoiceNumberLabel: t('Invoice number'),
  creditNoteNumberLabel: t('Credit note number'),
  deliveryDateLabel: t('Delivery date'),
  invoiceDateLabel: t('Invoice date'),
  creditNoteDateLabel: t('Credit note date'),
  applicableLawLabel: t('Applicable law'),
  paymentTermLabel: t('Payment term'),
  invoiceAmountLabel: t('Invoice amount'),
  creditNoteAmountLabel: t('Credit note amount'),
  days: t('days'),
});

export interface PaymentDetailsFormProps extends FormComponentProps<PaymentDetailsFormValues> {}

export const DEFAULT_VALUES: PaymentDetailsFormValues = {
  amount: null,
  country: 'DE',
  clearingSystem: 'invoice',
  deliveryDate: null,
  invoiceOrCreditNoteDate: null,
  invoiceOrCreditNoteNumber: '',
  paymentTerm: null,
};

const COUNTRIES: CountryCode[] = ['AT', 'CH', 'DE'];

export const PaymentDetailsForm = memo((props: PaymentDetailsFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = usePaymentDetailsFormSchema();

  const api = useForm<PaymentDetailsFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const clearingSystem = api.watch('clearingSystem');

  const today = useMemo(() => startOfDay(new Date()), []);

  return (
    <Form api={api} loading={loading} submitLabel={translations.nextLabel} onSubmit={onSubmit}>
      <Card subtitle={translations.clearingSystemSubtitle} title={translations.clearingSystemTitle}>
        <RadioGroupFormField name="clearingSystem" options={ClearingSystemOptions} />
      </Card>
      <div>
        <TextFormField
          name="invoiceOrCreditNoteNumber"
          label={
            clearingSystem === 'invoice'
              ? translations.invoiceNumberLabel
              : translations.creditNoteNumberLabel
          }
        />
        <DateFormField
          defaultCalendarMonth={today}
          label={translations.deliveryDateLabel}
          maxDate={today}
          name="deliveryDate"
        />
        <DateFormField
          defaultCalendarMonth={today}
          maxDate={today}
          name="invoiceOrCreditNoteDate"
          label={
            clearingSystem === 'invoice'
              ? translations.invoiceDateLabel
              : translations.creditNoteDateLabel
          }
        />
        <CountryFormField label={translations.applicableLawLabel} onlyCountries={COUNTRIES} />
        <NumberFormField
          label={translations.paymentTermLabel}
          name="paymentTerm"
          unit={translations.days}
        />
        <CurrencyFormField
          country="DE"
          name="amount"
          label={
            clearingSystem === 'invoice'
              ? translations.invoiceAmountLabel
              : translations.creditNoteAmountLabel
          }
        />
      </div>
    </Form>
  );
});
