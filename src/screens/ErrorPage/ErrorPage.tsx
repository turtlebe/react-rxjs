import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import Box from '@mui/material/Box';
import { useAsyncError } from 'react-router-dom';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  defaultTitle: t('Something went wrong'),
});

export interface ErrorPageProps {
  actionText?: string;
  description: string;
  onAction?: () => void;
  showError?: boolean;
  title?: string;
}

const bodyStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,

    '& > *': {
      marginBottom: theme.spacing(2),
    },
  });

export const ErrorPage = memo((props: ErrorPageProps) => {
  const { actionText, description, onAction, showError, title } = props;
  const translations = useTranslatedText(phrases);

  const error = useAsyncError();
  // @ts-ignore
  const stack = error?.stack || '';

  return (
    <Page>
      <Box css={bodyStyle}>
        <Typography css={(theme) => ({ color: theme.palette.error.main })} variant="h1">
          !
        </Typography>
        <Typography variant="h2">{title || translations.defaultTitle}</Typography>
        <Typography
          variant="body1"
          css={(theme) => ({
            width: theme.spacing(40),
            marginBottom: theme.spacing(3),
            textAlign: 'center',
          })}
        >
          {description}
          {showError ? stack : ''}
        </Typography>
        {actionText && onAction && (
          <Button color="primary" fullWidth={false} onClick={onAction}>
            {actionText}
          </Button>
        )}
      </Box>
    </Page>
  );
});
