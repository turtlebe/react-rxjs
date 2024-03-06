import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { useCurrencyFormat } from 'hooks/useCurrencyFormat';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import gradients from 'theme/gradients';
import { BalanceBg, MoneyOnHandGrad, PaidGrad } from 'theme/icons';

export type BalanceOverviewProps = {
  openAmount: number;
  receivedAmount: number;
};

const phrases = (t: TranslateFn) => ({
  Received: t('Received'),
  Open: t('Open'),
});

const wrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing(2.5),
  });

const cardStyle = (isReceived: boolean) => (theme: Theme) =>
  css({
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: theme.spacing(22.5),
    background: isReceived ? gradients.ForestGradient : gradients.RavenGradient,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(17),
    },
  });

const iconWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(5.4),
    height: theme.spacing(5.4),
    borderRadius: theme.spacing(0.75),
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
    },
  });

const backgroundStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: 0,
    right: 0,
    width: theme.spacing(21.5),
    height: theme.spacing(16.5),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(13.5),
      height: theme.spacing(12.5),
    },
  });

export const BalanceOverview = forwardRef<HTMLDivElement, BalanceOverviewProps>((props, ref) => {
  const { openAmount, receivedAmount } = props;
  const translations = useTranslatedText(phrases);
  const open = useCurrencyFormat(openAmount);
  const received = useCurrencyFormat(receivedAmount);
  return (
    <div css={wrapperStyle} ref={ref}>
      <Card css={cardStyle(true)}>
        <BalanceBg css={backgroundStyle} />
        <div css={iconWrapperStyle}>
          <PaidGrad />
        </div>
        <Typography css={(theme) => ({ color: theme.palette.primary.contrastText })} variant="h2">
          {received}
        </Typography>
        <Typography css={(theme) => ({ color: theme.palette.primary.contrastText })} variant="h4">
          {translations.Received}
        </Typography>
      </Card>
      <Card css={cardStyle(false)}>
        <BalanceBg css={backgroundStyle} />
        <div css={iconWrapperStyle}>
          <MoneyOnHandGrad />
        </div>
        <Typography css={(theme) => ({ color: theme.palette.primary.contrastText })} variant="h2">
          {open}
        </Typography>
        <Typography css={(theme) => ({ color: theme.palette.primary.contrastText })} variant="h4">
          {translations.Open}
        </Typography>
      </Card>
    </div>
  );
});
