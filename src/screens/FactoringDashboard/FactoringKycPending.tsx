import { memo } from 'react';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { TruckGraphic } from 'components/TruckGraphic';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  welcomeLabel: t('Welcome to truckOS!'),
  subtitleLabel: t('Thanks for completing the verification process'),
  text: t(
    'We are checking your documents and will let you know when we’re done. This should only take a day. Please ensure that you complete the Videoident process in the meantime.'
  ),
});

export const FactoringKycPending = memo(() => {
  const translations = useTranslatedText(phrases);

  return (
    <Card css={(theme) => ({ textAlign: 'center', padding: theme.spacing(1.25, 2.5, 2.5, 2.5) })}>
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="h2">
        {translations.welcomeLabel}
      </Typography>
      <TruckGraphic css={(theme) => ({ height: theme.spacing(19.5) })} />
      <Typography css={(theme) => ({ margin: theme.spacing(1.25, 6.25, 2.5, 6.25) })} variant="h4">
        {translations.subtitleLabel}
      </Typography>
      <Typography variant="body1">{translations.text}</Typography>
    </Card>
  );
});
