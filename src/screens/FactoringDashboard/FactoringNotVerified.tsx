import { memo, useCallback } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { TruckGraphic } from 'components/TruckGraphic';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, paths } from 'paths';

const phrases = (t: TranslateFn) => ({
  welcomeLabel: t('Welcome to truckOS!'),
  subtitleLabel: t("Let's get your business verified so you can start factoring"),
  textP1: t(
    "You need to do a quick one-time verification of your company before you can start factoring. This will only take 10 minues. Here's what you will need:"
  ),
  bullet1: t('Your business data'),
  bullet2: t('In case you have a Einzelunternehmen/GbR: your business license'),
  bullet3: t('Your ID card'),
  verifyButtonLabel: t('Verify your company now'),
});

const bulletsStyle = (theme: Theme) =>
  css({
    margin: theme.spacing(1.25, 6.25, 2.5, 6.25),
    textAlign: 'left',
    paddingInlineStart: theme.spacing(2.25),

    '& li::marker': {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: 'bolder',
    },

    [theme.breakpoints.down('md')]: {
      paddingInlineStart: 0,
      marginInlineStart: theme.spacing(4),
    },
  });

export const FactoringNotVerified = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();

  const handleVerify = useCallback(() => {
    navigate(fromRoot(paths.root.kyc.path));
  }, [navigate]);

  return (
    <Card css={(theme) => ({ textAlign: 'center', padding: theme.spacing(1.25, 2.5, 2.5, 2.5) })}>
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="h2">
        {translations.welcomeLabel}
      </Typography>
      <TruckGraphic css={(theme) => ({ height: theme.spacing(19.5) })} />
      <Typography css={(theme) => ({ margin: theme.spacing(1.25, 6.25, 2.5, 6.25) })} variant="h4">
        {translations.subtitleLabel}
      </Typography>
      <Typography variant="body1">{translations.textP1}</Typography>
      <Typography component="ul" css={bulletsStyle} variant="body1">
        <li>{translations.bullet1}</li>
        <li>{translations.bullet2}</li>
        <li>{translations.bullet3}</li>
      </Typography>
      <Button color="primary" onClick={handleVerify}>
        {translations.verifyButtonLabel}
      </Button>
    </Card>
  );
});
