import { Meta, StoryFn } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { RecordPaymentPage } from '../RecordPaymentPage';

export default {
  title: 'screens/Orderbook/Actions/RecordPayment/RecordPaymentPage',
  component: RecordPaymentPage,
  decorators: [withRouter()],
} as Meta<typeof RecordPaymentPage>;

const Template: StoryFn<typeof RecordPaymentPage> = () => <RecordPaymentPage />;

export const Default = Template.bind({});
Default.args = {};
