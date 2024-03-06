import { memo, useCallback } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { IconCircle } from 'components/IconCircle';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { parent, paths } from 'paths';
import { WorkflowPage } from 'screens/shared/Workflow/WorkflowPage';
import { EmailSuccess } from 'theme/icons';
import gradients from 'theme/gradients';

const phrases = (t: TranslateFn) => ({
  backToFactoringLabel: t('Back to the payment dashboard'),
  titleLabel: t('We are checking your data!'),
  textP1: t(
    'We will check the documents right away and let you know when we’re done. This should only take a day.'
  ),
  boldText: t('In the meantime, please check your email.'),
  textP2: t(
    'Walbing has sent you an email with a link for a quick ID verification that you need to finish before we can unlock you for truckOS Pay.'
  ),
});

const bodyStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,

    '& > *': {
      marginBottom: `${theme.spacing(2.5)} !important`,
    },

    '& > h2': {
      background: gradients.ForestGradient,
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  });

const iconStyle = (theme: Theme) =>
  css({
    height: theme.spacing(6),
    width: theme.spacing(6),
    background: theme.palette.primary.faded,
    color: theme.palette.primary.main,
    fontSize: 18,
  });

export const KycSubmitted = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(parent(paths.root.factoring.path));
  }, [navigate]);

  return (
    <WorkflowPage onClose={handleClose}>
      <div css={bodyStyle}>
        <Typography variant="h1">🎉</Typography>
        <Typography variant="h2">{translations.titleLabel}</Typography>
        <Typography variant="body1">{translations.textP1}</Typography>
        <IconCircle css={iconStyle}>
          <EmailSuccess />
        </IconCircle>
        <Typography css={(theme) => ({ color: theme.palette.primary.main })} variant="body1">
          {translations.boldText}
        </Typography>
        <Typography variant="body1">{translations.textP2}</Typography>
      </div>
      <Button color="primary" onClick={handleClose}>
        {translations.backToFactoringLabel}
      </Button>
    </WorkflowPage>
  );
});
