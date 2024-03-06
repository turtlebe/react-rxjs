import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { PopUp } from 'components/PopUp';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const EMAIL = 'support@truck-os.de';
const PHONE = '+49-89-2000-29910';

const phrases = (t: TranslateFn) => ({
  title: t('We are here for you!'),
  description: t(
    'You have a question, a problem, a suggestion or anything else? Call us or write us an email:'
  ),
});

export interface ContactPopupProps {
  onClose: () => void;
  open: boolean;
}

const anchorStyle = (theme: Theme) =>
  css({
    color: theme.palette.primary.main,
    textDecoration: 'none',
  });

export const ContactPopup = memo((props: ContactPopupProps) => {
  const { onClose, open } = props;
  const translations = useTranslatedText(phrases);

  return (
    <PopUp
      body={translations.description}
      open={open}
      title={translations.title}
      titleSize="h3"
      footer={
        <>
          <Typography component="a" css={anchorStyle} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </Typography>
          <Typography component="a" css={anchorStyle} href={`tel:${PHONE}`}>
            {PHONE}
          </Typography>
        </>
      }
      onClose={onClose}
    />
  );
});
