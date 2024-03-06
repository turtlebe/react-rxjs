import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { TruckOsTermsAndConditionsUrl, WalbingTermsAndConditionsUrl } from 'ref-data/misc';

const phrases = (t: TranslateFn) => ({
  part1: t('When clicking on ‘Get payment’ you accept the'),
  and: t('and'),
  part2: t('terms and conditions.'),
});

const style = (theme: Theme) =>
  css({
    marginTop: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,

    '& a': {
      color: 'currentColor',
    },

    [theme.breakpoints.down('md')]: {
      padding: '0 16%',
    },
  });

export const TermsText = memo((props: { className?: string }) => {
  const { className } = props;
  const translations = useTranslatedText(phrases);

  return (
    <Typography className={className} component="p" css={style} variant="caption">
      {translations.part1}{' '}
      <Link target="_blank" to={TruckOsTermsAndConditionsUrl}>
        truckOS
      </Link>{' '}
      {translations.and}{' '}
      <a href={WalbingTermsAndConditionsUrl} rel="noreferrer" target="_blank">
        Walbing
      </a>{' '}
      {translations.part2}
    </Typography>
  );
});
