import { forwardRef, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import List from '@mui/material/List';
import { PaymentRequestCardSummary } from 'ref-data/payments';
import { PaymentRequestListItem } from './PaymentRequestListItem';

export type PaymentRequestListProps = {
  onDelete: (requestId: string) => void;
  paymentRequests: PaymentRequestCardSummary[];
};

const wrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  });

export const PaymentRequestList = forwardRef<HTMLUListElement, PaymentRequestListProps>(
  (props, ref) => {
    const { onDelete, paymentRequests } = props;

    const elements = useMemo(
      () =>
        paymentRequests.map((request) => (
          <PaymentRequestListItem {...request} key={request.requestId} onDelete={onDelete} />
        )),
      [onDelete, paymentRequests]
    );

    return (
      <List disablePadding css={wrapperStyle} ref={ref}>
        {elements}
      </List>
    );
  }
);
