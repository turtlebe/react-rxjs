import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { TruckOsTermsAndConditionsUrl, WalbingTermsAndConditionsUrl } from 'ref-data/misc';
import { CheckboxFormField } from 'screens/shared/FormFields';

const phrases = (t: TranslateFn) => ({
  authP1: t('By placing a tick mark, you allow direct debit authorization for fees.'),
  termsPart1: t('You agree to the'),
  termsPart2: t('platform terms and conditions.'),
  and: t('and'),
  authP3: t(
    'You declare that, as an authorized representative of your company, you agree that Walbing may collect data from credit reporting agencies for the purpose of fulfilling its obligations under anti-money-laundering law and share this data, as well as the relevant information provided by your company on a later stage, with the marketplace participants.'
  ),
});

const authLabelStyle = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(1.25),
    color: theme.palette.text.secondary,

    '& p:not(:last-child)': {
      marginBottom: '1em',
    },

    '& a': {
      color: 'currentColor',
    },
  });

const authCheckboxStyle = (theme: Theme) =>
  css({
    '& .MuiFormControlLabel-root': {
      alignItems: 'flex-start',

      '& .MuiCheckbox-root': {
        paddingTop: theme.spacing(0.875),
      },
    },

    [theme.breakpoints.up('md')]: {
      gridRow: '1 / 4',
      gridColumn: 2,
    },
  });

export const AuthorizationFormField = () => {
  const translations = useTranslatedText(phrases);

  return (
    <CheckboxFormField
      css={authCheckboxStyle}
      name="authorization"
      label={
        <div css={authLabelStyle}>
          <Typography component="p" variant="body2">
            {translations.authP1}
          </Typography>
          <Typography component="p" variant="body2">
            {translations.termsPart1}{' '}
            <a href={WalbingTermsAndConditionsUrl} rel="noreferrer" target="_blank">
              Walbing
            </a>{' '}
            {translations.and}{' '}
            <a href={TruckOsTermsAndConditionsUrl} rel="noreferrer" target="_blank">
              truckOS
            </a>{' '}
            {translations.termsPart2}
          </Typography>
          <Typography component="p" variant="body2">
            {translations.authP3}
          </Typography>
        </div>
      }
    />
  );
};
