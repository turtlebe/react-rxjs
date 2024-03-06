import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { PaymentDetailsSection } from '../PaymentDetailsSection';
import { MockPaymentRequest } from './mock-data';

export default {
  title: 'screens/Factoring/Payment Request/PaymentDetailsSection',
  component: PaymentDetailsSection,
  decorators: [withRouter()],
  args: {
    ...MockPaymentRequest,
  },
} as Meta<typeof PaymentDetailsSection>;

const Template: StoryFn<typeof PaymentDetailsSection> = (args) => (
  <PaymentDetailsSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithPayoutInfo = Template.bind({});
WithPayoutInfo.args = {
  factoringFee: 0.015,
  payoutAmount: 1003.6,
};
