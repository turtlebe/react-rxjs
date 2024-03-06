import { memo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { useDateFormat } from 'hooks/useDateFormat';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';
import { useCurrencyFormat } from 'hooks/useCurrencyFormat';
import { useNumberFormat } from 'hooks/useNumberFormat';
import { PaymentRequestDetail } from 'api/types';
import { paths, sibling } from 'paths';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Payment details'),
  invoiceNumberLabel: t('Invoice number'),
  creditNoteNumberLabel: t('Credit note number'),
  deliveryDateLabel: t('Delivery date'),
  invoiceDateLabel: t('Invoice date'),
  creditNoteDateLabel: t('Credit note date'),
  invoiceAmountLabel: t('Invoice amount'),
  creditNoteAmountLabel: t('Credit note amount'),
  paymentTermLabel: t('Payment term'),
  factoringFeeLabel: t('Factoring fee'),
  payoutAmountLabel: t('Payout amount'),
  paymentTerm: withParams<'days'>((p) => t('{{days}} days', p)),
});

export interface PaymentDetailsSectionProps
  extends Pick<
      PaymentRequestDetail,
      | 'amount'
      | 'clearingSystem'
      | 'deliveryDate'
      | 'invoiceOrCreditNoteDate'
      | 'invoiceOrCreditNoteNumber'
      | 'paymentTerm'
    >,
    Pick<Partial<PaymentRequestDetail>, 'factoringFee' | 'payoutAmount'> {
  className?: string;
  hideEdit?: boolean;
}

export const PaymentDetailsSection = memo((props: PaymentDetailsSectionProps) => {
  const {
    amount,
    className,
    clearingSystem,
    deliveryDate,
    factoringFee,
    hideEdit,
    invoiceOrCreditNoteDate,
    invoiceOrCreditNoteNumber,
    paymentTerm,
    payoutAmount,
  } = props;
  const translations = useTranslatedText(phrases);
  const isInvoice = clearingSystem === 'invoice';

  const deliveryDateFormatted = useDateFormat(deliveryDate);
  const invoiceOrCreditNoteDateFormatted = useDateFormat(invoiceOrCreditNoteDate);
  const amountFormatted = useCurrencyFormat(amount);
  const factoringFeeFormatted = useNumberFormat(factoringFee, {
    style: 'percent',
    maximumFractionDigits: 3,
  });
  const payoutAmountFormatted = useCurrencyFormat(payoutAmount);

  return (
    <CardSection
      className={className}
      title={translations.title}
      rightHeaderElement={
        !hideEdit ? (
          <EditButton to={sibling(paths.root.factoring.createPayment.paymentDetails.path)} />
        ) : undefined
      }
    >
      <CardLineItem
        label={isInvoice ? translations.invoiceNumberLabel : translations.creditNoteNumberLabel}
        value={invoiceOrCreditNoteNumber}
        valueAlignment="right"
      />
      <CardLineItem
        label={translations.deliveryDateLabel}
        value={deliveryDateFormatted}
        valueAlignment="right"
      />
      <CardLineItem
        label={isInvoice ? translations.invoiceDateLabel : translations.creditNoteDateLabel}
        value={invoiceOrCreditNoteDateFormatted}
        valueAlignment="right"
      />
      <CardLineItem
        label={isInvoice ? translations.invoiceAmountLabel : translations.creditNoteAmountLabel}
        value={amountFormatted}
        valueAlignment="right"
      />
      <CardLineItem
        label={translations.paymentTermLabel}
        value={translations.paymentTerm({ days: String(paymentTerm) })}
        valueAlignment="right"
      />
      {factoringFee !== undefined && (
        <CardLineItem
          label={translations.factoringFeeLabel}
          value={factoringFeeFormatted}
          valueAlignment="right"
        />
      )}
      {payoutAmount !== undefined && (
        <CardLineItem
          primaryValue
          label={translations.payoutAmountLabel}
          value={payoutAmountFormatted}
          valueAlignment="right"
        />
      )}
    </CardSection>
  );
});
