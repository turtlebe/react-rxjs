import { memo } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { css, Theme } from '@emotion/react';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useDateFormat } from 'hooks/useDateFormat';
import { CollectiveInvoiceOrder } from './types';

export interface SelectOrderTableProps {
  handleSelectOrder: (order: CollectiveInvoiceOrder) => void;
  orders: CollectiveInvoiceOrder[];
  selectedOrders?: CollectiveInvoiceOrder[];
}

const headerStyle = (theme: Theme) =>
  css({
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    padding: theme.spacing(1.25, 0),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  });

const bodyStyle = (theme: Theme) =>
  css({
    fontSize: theme.typography.button.fontSize,
    padding: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  });

const phrases = (t: TranslateFn) => ({
  customer: t('Customer'),
  deliveryDate: t('Delivery date'),
  orderNo: t('Order No'),
  from: t('From'),
  to: t('To'),
  missingData: t('Missing data'),
});

export const DateTableCell = memo((props: { date: string }) => {
  const { date } = props;
  const formattedDate = useDateFormat(date);
  return <TableCell css={bodyStyle}>{formattedDate}</TableCell>;
});

export const SelectOrderTable = memo((props: SelectOrderTableProps) => {
  const { handleSelectOrder, orders, selectedOrders } = props;
  const translations = useTranslatedText(phrases);

  return (
    <div
      css={(theme) => ({
        border: `1px solid ${theme.palette.secondary.light}`,
        borderRadius: theme.spacing(1.25),
        padding: theme.spacing(1.25, 2.5),
        marginTop: theme.spacing(1.25),
      })}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell css={headerStyle} />
            <TableCell css={headerStyle}>{translations.customer}</TableCell>
            <TableCell css={headerStyle}>{translations.deliveryDate}</TableCell>
            <TableCell css={headerStyle}>{translations.orderNo}</TableCell>
            <TableCell css={headerStyle}>{translations.from}</TableCell>
            <TableCell css={headerStyle}>{translations.to}</TableCell>
            <TableCell css={headerStyle}>{translations.missingData}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.customerId}>
              <TableCell css={bodyStyle}>
                <Checkbox
                  checked={selectedOrders?.includes(order)}
                  size="medium"
                  onChange={() => handleSelectOrder(order)}
                />
              </TableCell>
              <TableCell css={bodyStyle}>{order.customerName}</TableCell>
              <DateTableCell date={order.deliveryDate} />
              <TableCell css={bodyStyle}>{order.orderNumber}</TableCell>
              <TableCell css={bodyStyle}>{order.from}</TableCell>
              <TableCell css={bodyStyle}>{order.to}</TableCell>
              <TableCell css={bodyStyle}>{order.missingData}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});
