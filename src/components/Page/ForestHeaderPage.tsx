import { memo, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { BackButton, CloseButton } from 'components/Button';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import gradients from 'theme/gradients';
import { fromRoot, paths } from 'paths';

export interface ForestHeaderPageProps {
  backLabel?: string;
  children: ReactNode;
  className?: string;
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
}

const phrases = (t: TranslateFn) => ({
  back: t('Back'),
});

const style = () => (theme: Theme) =>
  css({
    background: theme.palette.background.default,
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: theme.spacing(0, 5.5, 0, 8),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1.25, 2.5, 0, 2.5),
      zIndex: 5,
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

const headerStyle = () => (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column',
    [theme.breakpoints.down('md')]: {
      color: theme.palette.primary.contrastText,
      background: gradients.ForestGradient,
      margin: theme.spacing(-1.25, -2.5, 0),
      padding: theme.spacing(1.25, 2.5, 0),
    },
  });

const buttonGroupStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    color: theme.palette.primary.contrastText,
    minHeight: theme.spacing(3.25),
  });

const titleStyle = () => (theme: Theme) =>
  css({
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(1.5),
  });

const childrenStyle = () => (theme: Theme) =>
  css({
    overflow: 'auto',
    display: 'flex',
    flexFlow: 'column',
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  });

export const ForestHeaderPage = memo((props: ForestHeaderPageProps) => {
  const { backLabel, children, className, onBack, onClose, title } = props;
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();
  const navigate = useNavigate();

  const defaultOnClose = () => navigate(fromRoot(paths.root.orders.path));

  return (
    <Paper square className={className} css={style} elevation={0}>
      <div css={headerStyle}>
        <div css={buttonGroupStyle}>
          <CloseButton isWhite={isMobileView} onClick={onClose || defaultOnClose} />
          {onBack && (
            <BackButton
              color={isMobileView ? 'inherit' : 'secondary'}
              label={backLabel || translations.back}
              onClick={onBack}
            />
          )}
        </div>
        <Typography css={titleStyle} variant={isMobileView ? 'h2' : 'h1'}>
          {title}
        </Typography>
      </div>
      <div css={childrenStyle}>{children}</div>
    </Paper>
  );
});
