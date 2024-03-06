import { forwardRef } from 'react';
import { Card, CardLineItem } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

export interface BankAccountDetails {
  bic?: string;
  iban?: string;
}

const phrases = (t: TranslateFn) => ({
  bic: t('BIC'),
  iban: t('IBAN'),
});

export const BankAccount = forwardRef<HTMLDivElement, BankAccountDetails>((props, ref) => {
  const { bic, iban } = props;
  const translations = useTranslatedText(phrases);
  return (
    <Card color="tertiary" ref={ref}>
      <CardLineItem label={translations.iban} labelMinWidth={5} space="small" value={iban} />
      <CardLineItem label={translations.bic} labelMinWidth={5} space="small" value={bic} />
    </Card>
  );
});
