import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { PaymentsFinalConfirmation } from '../PaymentsFinalConfirmation';

export default {
  title: 'screens/Payment Flow/PaymentsFinalConfirmation',
  component: PaymentsFinalConfirmation,
  decorators: [withRouter()],
} as Meta<typeof PaymentsFinalConfirmation>;

const Template: StoryFn<typeof PaymentsFinalConfirmation> = () => <PaymentsFinalConfirmation />;

export const Default = Template.bind({});
Default.args = {};
