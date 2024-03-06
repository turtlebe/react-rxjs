import { forwardRef, memo, useMemo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { css, Theme } from '@emotion/react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from 'components/Typography';
import { useCurrencyFormat } from 'hooks/useCurrencyFormat';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';
import { useDateFormat } from 'hooks/useDateFormat';
import { useOrderStatusPhrase } from 'hooks/useOrderStatusPhrase';
import {
  OrderCardSummary,
  TosStatusEnum,
  statusWithProblem,
  statusWithInProgress,
  statusWithSuccess,
} from 'ref-data/orders';
import { Wallet } from 'theme/icons';
import { path, paths } from 'paths';

export interface OrderListItemProps extends OrderCardSummary {}

const phrases = (t: TranslateFn) => ({
  deliveryDateNotGiven: t('Delivery date not given yet'),
  deliveryDateDescription: withParams<'date'>((p) => t('Delivery date {{date}}', p)),
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
      color: theme.palette.error.main,
    }),
    ...(status === TosStatusEnum.IN_PROGRESS && {
      color: theme.palette.secondary.main,
    }),
    ...(status === TosStatusEnum.SUCCESS && {
      color: theme.palette.primary.main,
    }),
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

export const OrderListItem = memo((props: OrderListItemProps) => {
  const { amount, clearingSystem, customerName, deliveryDate, orderId, status } = props;
  const orderIdValue = orderId || '';
  const amountFormatted = useCurrencyFormat(Number(amount || 0));
  const deliveryDateFormatted = useDateFormat(deliveryDate || '');
  const translations = useTranslatedText(phrases);
  const statusText = useOrderStatusPhrase(status, clearingSystem);

  const tosStatus = useMemo(() => {
    if (statusWithProblem.includes(status)) {
      return TosStatusEnum.PROBLEM;
    }
    if (statusWithInProgress.includes(status)) {
      return TosStatusEnum.IN_PROGRESS;
    }
    if (statusWithSuccess.includes(status)) {
      return TosStatusEnum.SUCCESS;
    }
    return TosStatusEnum.IN_PROGRESS;
  }, [status]);

  return (
    <li css={{ listStyle: 'none' }}>
      <ListItem
        button
        alignItems="flex-start"
        component={Link}
        css={itemStyle}
        to={path(paths.root.orders.order.path, orderIdValue)}
        secondaryAction={
          amount ? (
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
          )
        }
      >
        <ListItemText
          primary={<Typography variant="h4">{customerName}</Typography>}
          secondaryTypographyProps={{ component: 'span' }}
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
