import { useMemo } from 'react';
import { date, number, object, string } from 'yup';
import { differenceInDays, startOfDay } from 'date-fns';
import { RequiredNumberSchema } from 'yup/lib/number';
import { ConditionBuilder } from 'yup/lib/Condition';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';
import { ClearingSystem } from 'api/types';

const phrases = (t: TranslateFn) => ({
  invoiceAmountRequired: t('Please enter the invoice amount'),
  creditNoteAmountRequired: t('Please enter the credit note amount'),
  deliveryDateRequired: t('Please enter the delivery date'),
  deliveryDateInFuture: t('Delivery date cannot be in the future'),
  invoiceDateRequired: t('Please enter the invoice date'),
  creditNoteDateRequired: t('Please enter the credit note date'),
  invoiceDateInFuture: t('Invoice date cannot be in the future'),
  creditNoteDateInFuture: t('Credit note date cannot be in the future'),
  invoiceNumberRequired: t('Please enter the invoice number'),
  creditNoteNumberRequired: t('Please enter the credit note number'),
  paymentTermRequired: t('Please enter the payment term'),
  paymentTermLessThanMin: t('Payment term has to be more than 11 days'),
  paymentTermInvoiceFromPastLessThanMin: withParams<'days'>((params) =>
    t(
      'The payment due date should be at least 11 days from now. Based on your invoice date, and payment terms, it is only {{days}} days',
      params
    )
  ),
  paymentTermCreditNoteFromPastLessThanMin: withParams<'days'>((params) =>
    t(
      'The payment due date should be at least 11 days from now. Based on your credit note date, and payment terms, it is only {{days}} days',
      params
    )
  ),
});

const today = startOfDay(new Date());

export const usePaymentDetailsFormSchema = () => {
  const translations = useTranslatedText(phrases);

  const schema = useMemo(
    () =>
      object({
        amount: number()
          .nullable()
          .when('clearingSystem', (clearingSystem: ClearingSystem, amountSchema) =>
            clearingSystem === 'invoice'
              ? amountSchema.required(translations.invoiceAmountRequired)
              : amountSchema.required(translations.creditNoteAmountRequired)
          ),
        country: string(),
        clearingSystem: string(),
        deliveryDate: date()
          .nullable()
          .required(translations.deliveryDateRequired)
          .max(today, translations.deliveryDateInFuture),
        invoiceOrCreditNoteDate: date()
          .nullable()
          .when('clearingSystem', (clearingSystem: ClearingSystem, invoiceOrCreditNoteDateSchema) =>
            clearingSystem === 'invoice'
              ? invoiceOrCreditNoteDateSchema
                  .required(translations.invoiceDateRequired)
                  .max(today, translations.invoiceDateInFuture)
              : invoiceOrCreditNoteDateSchema
                  .required(translations.creditNoteDateRequired)
                  .max(today, translations.creditNoteDateInFuture)
          ),
        invoiceOrCreditNoteNumber: string().when(
          'clearingSystem',
          (clearingSystem: ClearingSystem, invoiceOrCreditNoteNumberSchema) =>
            clearingSystem === 'invoice'
              ? invoiceOrCreditNoteNumberSchema.required(translations.invoiceNumberRequired)
              : invoiceOrCreditNoteNumberSchema.required(translations.creditNoteNumberRequired)
        ),
        paymentTerm: number()
          .nullable()
          .required(translations.paymentTermRequired)
          .when(['invoiceOrCreditNoteDate', 'clearingSystem'], ((
            invoiceOrCreditNoteDate: Date | null,
            clearingSystem: ClearingSystem,
            paymentTermSchema
          ) => {
            if (!invoiceOrCreditNoteDate) {
              return paymentTermSchema;
            }

            const daysDiff = differenceInDays(invoiceOrCreditNoteDate, today);
            const min = 11 + daysDiff;

            if (daysDiff === 0) {
              return paymentTermSchema.min(min, translations.paymentTermLessThanMin);
            }

            return clearingSystem === 'invoice'
              ? paymentTermSchema.min(
                  min,
                  translations.paymentTermInvoiceFromPastLessThanMin({ days: String(min) })
                )
              : paymentTermSchema.min(
                  min,
                  translations.paymentTermCreditNoteFromPastLessThanMin({ days: String(min) })
                );
          }) as ConditionBuilder<RequiredNumberSchema<number | null | undefined>>),
      }),
    [translations]
  );

  return schema;
};
