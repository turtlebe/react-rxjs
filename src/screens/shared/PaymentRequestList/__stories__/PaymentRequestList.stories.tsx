import { Meta, StoryFn } from '@storybook/react';
import { subDays } from 'date-fns';
import { ReceivableStatus } from 'api/types';
import { PaymentRequestCardSummary } from 'ref-data/payments';
import { withRouter } from 'utils/storybook/decorators';
import { PaymentRequestList } from '../PaymentRequestList';

export default {
  title: 'screens/Factoring/PaymentRequestList',
  component: PaymentRequestList,
  decorators: [withRouter()],
} as Meta<typeof PaymentRequestList>;

const Template: StoryFn<typeof PaymentRequestList> = (args) => <PaymentRequestList {...args} />;
const mockRequests: PaymentRequestCardSummary[] = [
  {
    requestId: 'request_1',
    debtorName: 'DHL Supply Chain',
    status: 'SETTLEMENT_OVERDUE' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1040,
    sortIndex: 0,
  },
  {
    requestId: 'request_2',
    debtorName: 'DHL Supply Chain',
    status: 'IN_COLLECTION' as ReceivableStatus,
    deliveryDate: subDays(new Date(), 36),
    amount: 1040,
    sortIndex: 0,
  },
  {
    requestId: 'request_3',
    debtorName: 'DHL Supply Chain',
    status: 'UNPAID_TO_BUYER' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1040,
    sortIndex: 0,
  },
  {
    requestId: 'request_4',
    debtorName: 'DHL Supply Chain',
    status: 'DENIED' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1040,
    sortIndex: 0,
  },
  {
    requestId: 'request_5',
    debtorName: 'DHL Supply Chain',
    status: 'UNKNOWN' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1040,
    sortIndex: 0,
  },
  {
    requestId: 'request_6',
    debtorName: 'DHL Supply Chain',
    status: 'DRAFT' as ReceivableStatus,
    sortIndex: 2,
  },
  {
    requestId: 'request_7',
    debtorName: 'DHL Supply Chain',
    status: 'DRAFT' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1233.55,
    sortIndex: 2,
  },
  {
    requestId: 'request_8',
    debtorName: 'DB Schenker',
    status: 'SUBMITTED' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1040,
    sortIndex: 3,
  },
  {
    requestId: 'request_9',
    debtorName: 'DB Schenker',
    status: 'SOLD' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1040,
    sortIndex: 4,
  },
  {
    requestId: 'request_10',
    debtorName: 'DB Schenker',
    status: 'PAID_TO_CARRIER' as ReceivableStatus,
    deliveryDate: new Date(),
    amount: 1233.55,
    sortIndex: 4,
  },
];
export const Default = Template.bind({});
Default.args = {
  onDelete: () => null,
  paymentRequests: mockRequests,
};
