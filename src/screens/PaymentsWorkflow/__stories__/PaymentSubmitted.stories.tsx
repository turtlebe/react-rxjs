import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { PaymentSubmitted } from '../PaymentSubmitted';

export default {
  title: 'screens/Payment Flow/PaymentSubmitted',
  component: PaymentSubmitted,
  decorators: [withRouter()],
} as Meta<typeof PaymentSubmitted>;

const Template: StoryFn<typeof PaymentSubmitted> = () => <PaymentSubmitted />;

export const Default = Template.bind({});
Default.args = {};
