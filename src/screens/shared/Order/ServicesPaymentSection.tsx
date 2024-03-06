import { memo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { useCurrencyFormat } from 'hooks/useCurrencyFormat';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { formatAsPercentage } from 'utils/number';
import { OrderServiceAgreementDetails, OrderDetails } from 'api/types';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Services & payment'),
  open: t('Open'),
  totalNetLabel: t('Total (net)'),
  clearingSystem: t('Clearing system'),
  invoice: t('Invoice'),
  creditNote: t('Credit note'),
  paymentTerm: t('Payment term'),
  vatRate: t('VAT rate'),
});

export interface ServicesPaymentSectionProps
  extends Pick<OrderServiceAgreementDetails, 'paymentTermDays' | 'services' | 'vatRate'>,
    Pick<OrderDetails, 'clearingSystem'> {
  className?: string;
  editPath: string;
  hideEdit?: boolean;
}

export const ServicesPaymentSection = memo((props: ServicesPaymentSectionProps) => {
  const { className, clearingSystem, editPath, hideEdit, paymentTermDays, services, vatRate } =
    props;
  const translations = useTranslatedText(phrases);

  const totalAmount = services
    ?.map((service) => Number(service.netAmount))
    .reduce((a, b) => a + b, 0);
  const totalAmountFormatted = useCurrencyFormat(totalAmount);

  return (
    <CardSection
      className={className}
      color="primary"
      rightHeaderElement={!hideEdit && <EditButton to={editPath} />}
      title={translations.title}
    >
      {services?.map((service) => (
        <CardLineItem
          key={service.service}
          label={service.service}
          space="small"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          value={useCurrencyFormat(Number(service.netAmount))}
          valueAlignment="right"
        />
      ))}
      <CardLineItem
        primaryValue
        label={translations.totalNetLabel}
        space="small"
        value={totalAmountFormatted || translations.open}
        valueAlignment="right"
      />
      <CardLineItem
        label={translations.vatRate}
        space="small"
        value={formatAsPercentage(vatRate, 0) || translations.open}
        valueAlignment="right"
      />
      <CardLineItem
        label={translations.clearingSystem}
        space="small"
        value={clearingSystem === 'invoice' ? translations.invoice : translations.creditNote}
        valueAlignment="right"
      />
      <CardLineItem
        label={translations.paymentTerm}
        space="small"
        value={paymentTermDays || translations.open}
        valueAlignment="right"
      />
    </CardSection>
  );
});
