import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { PaymentRequest } from '../PaymentRequest';
import { MockPaymentRequest } from './mock-data';

export default {
  title: 'screens/Factoring/Payment Request',
  component: PaymentRequest,
  decorators: [withRouter()],
  args: {
    paymentRequest: MockPaymentRequest,
  },
} as Meta<typeof PaymentRequest>;

const Template: StoryFn<typeof PaymentRequest> = (args) => <PaymentRequest {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};

export const DraftRequest = Template.bind({});
DraftRequest.args = {
  paymentRequest: {
    ...MockPaymentRequest,
    status: 'DRAFT',
  },
};
