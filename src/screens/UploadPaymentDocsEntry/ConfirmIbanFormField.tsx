import { css, Theme } from '@emotion/react';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CheckboxFormField } from 'screens/shared/FormFields';

const BANK_RECIPIENT = 'Wonka Transporte GmbH via Walbing';
const BANK_IBAN = 'DE12 3456 7891 01112 13';
const BANK_BIC = 'HSHNDEHHXXX';

const phrases = (t: TranslateFn) => ({
  virtualIbanLabel: t('Virtual IBAN'),
  ibanDescription: t(
    'During the signup process, you received a virtual IBAN from our partner Walbing that has to be included on your invoice. Your customer has to pay the invoice amount to this virtual IBAN so Walbing can automatically access the payment.'
  ),
  ibanHighlight: t('Your invoice has to include the following statement:'),
  paymentInstructions: t(
    'Payments with debt-discharging effect can only be made to the following bank account:'
  ),
  recipientLabel: t('Recipient'),
  ibanLabel: t('IBAN'),
  bicLabel: t('BIC'),
  confirmIbanLabel: t(
    'By placing a tick mark, you confirm that your invoice includes the statement above'
  ),
});

const cardStyle = (theme: Theme) =>
  css({ marginTop: theme.spacing(1.25), marginBottom: '0 !important' });

export const ConfirmIbanFormField = () => {
  const translations = useTranslatedText(phrases);

  return (
    <div css={{ gridRow: '1 / 3' }}>
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="h2">
        {translations.virtualIbanLabel}
      </Typography>
      <Typography variant="body1">
        {translations.ibanDescription}
        <br />
        <br />
      </Typography>
      <Typography css={(theme) => ({ color: theme.palette.primary.main })} variant="h5">
        {translations.ibanHighlight}
      </Typography>
      <Card css={cardStyle}>
        <Typography variant="h4">
          {translations.paymentInstructions}
          <br />
          <br />
          {`${translations.recipientLabel}: ${BANK_RECIPIENT}`}
          <br />
          {`${translations.ibanLabel}: ${BANK_IBAN}`}
          <br />
          {`${translations.bicLabel}: ${BANK_BIC}`}
        </Typography>
      </Card>
      <CheckboxFormField
        css={(theme) => ({ paddingLeft: theme.spacing(1) })}
        label={<Typography variant="h4">{translations.confirmIbanLabel}</Typography>}
        name="confirmInvoiceHasIban"
      />
    </div>
  );
};
