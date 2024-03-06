import { forwardRef, memo, MouseEvent, useCallback, useMemo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { css, Theme } from '@emotion/react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from 'components/Typography';
import { IconButton } from 'components/Button';
import { useCurrencyFormat } from 'hooks/useCurrencyFormat';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';
import { useDateFormat } from 'hooks/useDateFormat';
import { usePaymentStatusPhrase } from 'hooks/usePaymentStatusPhrase';
import {
  statusWithPaid,
  statusWithProblem,
  statusWithSubmitted,
  TosStatusEnum,
  PaymentRequestCardSummary,
} from 'ref-data/payments';
import { Bin, MoneyOnHand, Paid, Wallet } from 'theme/icons';
import gradients from 'theme/gradients';
import { path, paths } from 'paths';

export interface PaymentRequestListItemProps extends PaymentRequestCardSummary {
  onDelete: (requestId: string) => void;
}

const phrases = (t: TranslateFn) => ({
  deliveryDateNotGiven: t('Delivery date not given yet'),
  deliveryDateDescription: withParams<'date'>((p) => t('Delivered on {{date}}', p)),
});

const itemStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1.25),
    padding: theme.spacing(1.25),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,

    '& .MuiListItemSecondaryAction-root': {
      position: 'relative',
      right: 'auto',
      top: 'auto',
      transform: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: theme.spacing(0.6),
    },
  });

const statusStyle = (status: TosStatusEnum) => (theme: Theme) =>
  css({
    width: 'max-content',
    ...(status === TosStatusEnum.PROBLEM && {
      backgroundColor: `${theme.palette.error.main}10`,
      color: theme.palette.error.main,
      borderRadius: theme.spacing(0.625),
      padding: theme.spacing(0.25, 0.625),
    }),
    ...(status === TosStatusEnum.DRAFT && {
      backgroundColor: `${theme.palette.primary.main}10`,
      color: theme.palette.primary.main,
      borderRadius: theme.spacing(0.625),
      padding: theme.spacing(0.25, 0.625),
    }),
    ...(status === TosStatusEnum.SUBMITTED && {
      color: theme.palette.text.primary,
    }),
    ...(status === TosStatusEnum.PAID && {
      color: theme.palette.primary.main,
    }),
  });

const iconWrapperStyle = (status: TosStatusEnum) => (theme: Theme) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: status === TosStatusEnum.PAID ? gradients.ForestGradient : gradients.RavenGradient,
    width: theme.spacing(5),
    minWidth: 'auto',
    margin: 0,
    height: theme.spacing(5),
    borderRadius: theme.spacing(0.75),
    color: theme.palette.background.default,
    fontSize: theme.spacing(2.5),
  });

const middleWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: theme.spacing(0.25),
  });

const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink ref={ref} {...props} role={undefined} />
));

export const PaymentRequestListItem = memo((props: PaymentRequestListItemProps) => {
  const { amount, debtorName, deliveryDate, onDelete, requestId, status } = props;
  const amountFormatted = useCurrencyFormat(amount || 0);
  const deliveryDateFormatted = useDateFormat(deliveryDate || '');
  const translations = useTranslatedText(phrases);
  const statusText = usePaymentStatusPhrase(status);

  const tosStatus = useMemo(() => {
    if (statusWithProblem.includes(status)) {
      return TosStatusEnum.PROBLEM;
    }
    if (statusWithSubmitted.includes(status)) {
      return TosStatusEnum.SUBMITTED;
    }
    if (statusWithPaid.includes(status)) {
      return TosStatusEnum.PAID;
    }
    return TosStatusEnum.DRAFT;
  }, [status]);

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onDelete(requestId);
      e.stopPropagation();
      e.preventDefault();
    },
    [onDelete, requestId]
  );

  return (
    <li css={{ listStyle: 'none' }}>
      <ListItem
        button
        alignItems="flex-start"
        component={Link}
        css={itemStyle}
        to={path(paths.root.factoring.payment.path, requestId)}
        secondaryAction={
          <>
            {amount ? (
              <Typography css={(theme) => ({ color: theme.palette.primary.main })} variant="h4">
                {amountFormatted}
              </Typography>
            ) : (
              <Wallet
                css={(theme) => ({
                  color: theme.palette.secondary.main,
                  marginBottom: theme.spacing(0.5),
                })}
              />
            )}
            {status === 'DRAFT' && (
              <IconButton onClick={handleDelete}>
                <Bin css={(theme) => ({ color: theme.palette.primary.main })} />
              </IconButton>
            )}
          </>
        }
      >
        <ListItemAvatar css={iconWrapperStyle(tosStatus)}>
          {tosStatus === TosStatusEnum.PAID ? <Paid /> : <MoneyOnHand />}
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">{debtorName}</Typography>}
          css={{
            margin: 0,
          }}
          secondary={
            <span css={middleWrapperStyle}>
              <Typography variant="h6">
                {deliveryDate
                  ? translations.deliveryDateDescription({ date: deliveryDateFormatted })
                  : translations.deliveryDateNotGiven}
              </Typography>
              <Typography css={statusStyle(tosStatus)} variant="h6">
                {statusText}
              </Typography>
            </span>
          }
        />
      </ListItem>
    </li>
  );
});
