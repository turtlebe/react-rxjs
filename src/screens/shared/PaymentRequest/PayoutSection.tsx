import { memo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { useCurrencyFormat } from 'hooks/useCurrencyFormat';
import { useDateFormat } from 'hooks/useDateFormat';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useNumberFormat } from 'hooks/useNumberFormat';
import { PaymentRequestDetail } from 'api/types';

const phrases = (t: TranslateFn) => ({
  title: t('Payout'),
  payoutDateLabel: t('Latest payout date'),
  factoringFeeLabel: t('Factoring fee'),
  payoutAmountLabel: t('Payout amount'),
});

export interface PayoutSectionProps
  extends Pick<PaymentRequestDetail, 'factoringFee' | 'payoutAmount' | 'payoutDate'> {
  className?: string;
}

export const PayoutSection = memo((props: PayoutSectionProps) => {
  const { className, factoringFee, payoutAmount, payoutDate } = props;
  const translations = useTranslatedText(phrases);

  const payoutDateFormatted = useDateFormat(payoutDate);
  const factoringFeeFormatted = useNumberFormat(factoringFee, {
    style: 'percent',
    maximumFractionDigits: 3,
  });
  const payoutAmountFormatted = useCurrencyFormat(payoutAmount);

  return (
    <CardSection className={className} color="primary" title={translations.title}>
      <CardLineItem
        label={translations.payoutDateLabel}
        value={payoutDateFormatted}
        valueAlignment="right"
      />
      <CardLineItem
        label={translations.factoringFeeLabel}
        value={factoringFeeFormatted}
        valueAlignment="right"
      />
      <CardLineItem
        primaryValue
        label={translations.payoutAmountLabel}
        value={payoutAmountFormatted}
        valueAlignment="right"
      />
    </CardSection>
  );
});
