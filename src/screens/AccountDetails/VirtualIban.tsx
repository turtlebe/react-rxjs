import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { Card } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CompanyAccountDetails } from 'api/types';

export interface VirtualIbanProps extends Pick<CompanyAccountDetails, 'kycStatus'> {
  bic?: string;
  iban?: string;
  recipient?: string;
}

const phrases = (t: TranslateFn) => ({
  virtualIbanDescription: t('Please include the following statement on your invoices'),
  bankAccountDescription: t(
    'Payments with debt-discharging effect can only be made to the following bank account:'
  ),
  virtualIbanVerifyDescription: t(
    'Once you have completed the verification process, you will find your virtual IBAN here.'
  ),
  recipient: 'Recipient',
  iban: 'IBAN',
  bic: 'BIC',
});

const titleStyle = (theme: Theme) =>
  css({
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    color: theme.palette.text.secondary,
    width: '100%',
    padding: theme.spacing(1, 0),
    borderBottom: `0.5px solid ${theme.palette.divider}`,
  });

const verifiedWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  });

const notVerifiedWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing(1),
  });

export const VirtualIban = forwardRef<HTMLDivElement, VirtualIbanProps>((props, ref) => {
  const { bic, iban, kycStatus, recipient } = props;
  const translations = useTranslatedText(phrases);

  return (
    <Card color="tertiary" ref={ref}>
      {kycStatus === 'complete' ? (
        <div css={verifiedWrapperStyle}>
          <Typography css={titleStyle}>{translations.virtualIbanDescription}</Typography>
          <Typography css={(theme) => ({ paddingBottom: theme.spacing(2.5) })}>
            {translations.bankAccountDescription}
          </Typography>
          <Typography>{`${translations.recipient}: ${recipient}`}</Typography>
          <Typography>{`${translations.iban}: ${iban}`}</Typography>
          <Typography>{`${translations.bic}: ${bic}`}</Typography>
        </div>
      ) : (
        <div css={notVerifiedWrapperStyle}>
          <Typography>{translations.virtualIbanVerifyDescription}</Typography>
        </div>
      )}
    </Card>
  );
});
