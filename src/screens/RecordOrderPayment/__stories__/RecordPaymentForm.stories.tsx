import { StoryFn, Meta } from '@storybook/react';
import { RecordPaymentForm } from '../RecordPaymentForm';

export default {
  title: 'screens/Orderbook/Actions/RecordPayment/RecordPaymentForm',
  component: RecordPaymentForm,
} as Meta<typeof RecordPaymentForm>;

const Template: StoryFn<typeof RecordPaymentForm> = (args) => <RecordPaymentForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {};
