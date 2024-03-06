import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { Card } from 'components/Card';
import { TruckGraphic } from 'components/TruckGraphic';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  title: t('Welcome to truckOS!'),
  instruction: t('To see something here, add your first order to the truckOS order book'),
});

const style = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    padding: theme.spacing(3.75),
  });

export const EmptyOrderList = memo(() => {
  const translations = useTranslatedText(phrases);

  return (
    <Card css={style}>
      <Typography variant="h2">{translations.title}</Typography>
      <TruckGraphic css={(theme) => ({ height: theme.spacing(17) })} />
      <Typography css={(theme) => ({ color: theme.palette.text.secondary })} variant="body1">
        {translations.instruction}
      </Typography>
    </Card>
  );
});
