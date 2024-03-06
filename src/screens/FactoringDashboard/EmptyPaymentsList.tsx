import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { Card } from 'components/Card';
import { TruckGraphic } from 'components/TruckGraphic';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  title: t('Welcome to truckOS!'),
  emptyMessage: t('No payment requests yet'),
  instruction: t('To see something here, request your first fast payment with truckOS Pay'),
});

const style = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    padding: theme.spacing(3.75),
  });

export const EmptyPaymentsList = memo(() => {
  const translations = useTranslatedText(phrases);

  return (
    <Card css={style}>
      <Typography variant="h2">{translations.title}</Typography>
      <TruckGraphic css={(theme) => ({ height: theme.spacing(17) })} />
      <Typography variant="h4">{translations.emptyMessage}</Typography>
      <Typography css={(theme) => ({ color: theme.palette.text.secondary })} variant="body1">
        {translations.instruction}
      </Typography>
    </Card>
  );
});
