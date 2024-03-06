import { forwardRef, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import List from '@mui/material/List';
import { OrderCardSummary } from 'ref-data/orders';
import { OrderListItem } from './OrderListItem';

export type OrderListProps = {
  orders: OrderCardSummary[];
};

const wrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  });

export const OrderList = forwardRef<HTMLUListElement, OrderListProps>((props, ref) => {
  const { orders } = props;

  const elements = useMemo(
    () => orders.map((order) => <OrderListItem {...order} key={order.orderId} />),
    [orders]
  );

  return (
    <List disablePadding css={wrapperStyle} ref={ref}>
      {elements}
    </List>
  );
});
