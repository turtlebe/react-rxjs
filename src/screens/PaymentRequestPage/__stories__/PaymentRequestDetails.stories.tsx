import { StoryFn, Meta } from '@storybook/react';
import { MockPaymentRequest } from 'screens/shared/PaymentRequest/__stories__/mock-data';
import { PaymentRequestDetails } from '../PaymentRequestDetails';

export default {
  title: 'screens/Factoring/PaymentRequestDetails',
  component: PaymentRequestDetails,
  args: {
    paymentRequest: MockPaymentRequest,
  },
} as Meta<typeof PaymentRequestDetails>;

const Template: StoryFn<typeof PaymentRequestDetails> = (args) => (
  <PaymentRequestDetails {...args} />
);

export const SUBMITTED = Template.bind({});
SUBMITTED.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'SUBMITTED',
  },
};

export const SOLD = Template.bind({});
SOLD.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'SOLD',
  },
};

export const PAID_TO_CARRIER = Template.bind({});
PAID_TO_CARRIER.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'PAID_TO_CARRIER',
  },
};

export const SETTLED = Template.bind({});
SETTLED.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'SETTLED',
  },
};

export const SETTLEMENT_OVERDUE = Template.bind({});
SETTLEMENT_OVERDUE.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'SETTLEMENT_OVERDUE',
  },
};

export const IN_COLLECTION = Template.bind({});
IN_COLLECTION.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'IN_COLLECTION',
  },
};

export const UNPAID_TO_BUYER = Template.bind({});
UNPAID_TO_BUYER.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'UNPAID_TO_BUYER',
  },
};

export const DENIED = Template.bind({});
DENIED.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'DENIED',
  },
};

export const UNKNOWN = Template.bind({});
UNKNOWN.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'UNKNOWN',
  },
};
