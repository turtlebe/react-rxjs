import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { ColumnLayout } from 'components/Page';
import { PaymentRequestDetail } from 'api/types';
import { CustomerSection } from './CustomerSection';
import { DocumentsSection } from './DocumentsSection';
import { PaymentDetailsSection } from './PaymentDetailsSection';
import { PayoutSection } from './PayoutSection';

export interface PaymentRequestProps {
  hideEdit?: boolean;
  paymentRequest: PaymentRequestDetail;
}

const paymentDetailsStyle = (theme: Theme) =>
  css({
    gridColumn: 1,
    gridRow: '1 / 3',

    [theme.breakpoints.down('md')]: {
      gridRow: 2,
    },
  });

const customerStyle = (theme: Theme) =>
  css({
    gridColumn: 2,
    gridRow: 1,

    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
      gridRow: 1,
    },
  });

const documentsStyle = css({
  gridColumn: 1,
  gridRow: 3,
});

const payoutStyle = (theme: Theme) =>
  css({
    gridColumn: 2,
    gridRow: '2 / 4',

    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
      gridRow: 4,
    },
  });

export const PaymentRequest = memo((props: PaymentRequestProps) => {
  const {
    hideEdit,
    paymentRequest: {
      amount,
      clearingSystem,
      customerContact,
      customerInformation,
      deliveryDate,
      documents,
      factoringFee,
      invoiceOrCreditNoteDate,
      invoiceOrCreditNoteNumber,
      paymentTerm,
      payoutAmount,
      payoutDate,
      status,
    },
  } = props;

  const isDraft = status === 'DRAFT';

  return (
    <ColumnLayout css={{ marginBottom: '0 !important' }}>
      <PaymentDetailsSection
        amount={amount}
        clearingSystem={clearingSystem}
        css={paymentDetailsStyle}
        deliveryDate={deliveryDate}
        factoringFee={!isDraft ? factoringFee : undefined}
        hideEdit={hideEdit}
        invoiceOrCreditNoteDate={invoiceOrCreditNoteDate}
        invoiceOrCreditNoteNumber={invoiceOrCreditNoteNumber}
        paymentTerm={paymentTerm}
        payoutAmount={!isDraft ? payoutAmount : undefined}
      />
      <DocumentsSection css={documentsStyle} documents={documents} hideEdit={hideEdit} />
      <CustomerSection
        css={customerStyle}
        customerContact={customerContact}
        customerInformation={customerInformation}
        hideEdit={hideEdit}
      />
      {isDraft && (
        <PayoutSection
          css={payoutStyle}
          factoringFee={factoringFee}
          payoutAmount={payoutAmount}
          payoutDate={payoutDate}
        />
      )}
    </ColumnLayout>
  );
});
