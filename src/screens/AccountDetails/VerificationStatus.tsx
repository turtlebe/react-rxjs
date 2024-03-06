import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { Card } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Success } from 'theme/icons';
import { CompanyAccountDetails } from 'api/types';

export interface VerificationStatusProps extends Pick<CompanyAccountDetails, 'kycStatus'> {}

const phrases = (t: TranslateFn) => ({
  accountVerifiedText: t('Your account is verified for truckOS pay'),
  accountNotVerifiedText: t('Your account is not verified yet'),
  accountVerificationInProgress: t(
    'We are checking your data and you should be able to start factoring soon.'
  ),
});

const verifiedWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  });

export const VerificationStatus = forwardRef<HTMLDivElement, VerificationStatusProps>(
  (props, ref) => {
    const { kycStatus } = props;
    const translations = useTranslatedText(phrases);
    return (
      <Card color="tertiary" ref={ref}>
        {kycStatus === 'complete' ? (
          <div css={verifiedWrapperStyle}>
            <Success css={(theme) => ({ color: theme.palette.success.main })} />
            <Typography css={(theme) => ({ color: theme.palette.success.main })}>
              {translations.accountVerifiedText}
            </Typography>
          </div>
        ) : (
          <div css={verifiedWrapperStyle}>
            <Typography>{translations.accountVerificationInProgress}</Typography>
          </div>
        )}
      </Card>
    );
  }
);
