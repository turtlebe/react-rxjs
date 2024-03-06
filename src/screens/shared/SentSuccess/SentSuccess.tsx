import { memo, useCallback } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useLocation, useParams, RouteObject } from 'react-router-dom';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { paths, parent } from 'paths';
import { WorkflowPage } from 'screens/shared/Workflow/WorkflowPage';
import gradients from 'theme/gradients';

const phrases = (t: TranslateFn) => ({
  backToOrderLabel: t('Back to the order'),
});

const bodyStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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

export const SentSuccess = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const orderIdValue = params.orderId || '';

  const handleClose = useCallback(() => {
    navigate(parent(paths.root.orders.order.path, orderIdValue));
  }, [navigate, orderIdValue]);

  return (
    <WorkflowPage onClose={handleClose}>
      <div css={bodyStyle}>
        <Typography variant="h1">🎉</Typography>
        <Typography variant="h2">{state.mainText}</Typography>
        <Typography variant="body1">{state.subText}</Typography>
      </div>
      <Button color="primary" onClick={handleClose}>
        {translations.backToOrderLabel}
      </Button>
    </WorkflowPage>
  );
});

export const SentSuccessRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.success.path,
    element: <SentSuccess />,
  },
];
