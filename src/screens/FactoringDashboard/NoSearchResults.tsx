import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { DoubleCircleArrow } from 'theme/icons';

const phrases = (t: TranslateFn) => ({
  title: t('No entries found'),
  instruction: t('Please try another search term'),
});

const style = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    padding: theme.spacing(3.75),
  });

export const NoSearchResults = memo(() => {
  const translations = useTranslatedText(phrases);

  return (
    <Card css={style}>
      <Typography variant="h3">{translations.title}</Typography>
      <DoubleCircleArrow css={(theme) => ({ fontSize: theme.spacing(4) })} />
      <Typography css={(theme) => ({ color: theme.palette.text.secondary })} variant="body1">
        {translations.instruction}
      </Typography>
    </Card>
  );
});
