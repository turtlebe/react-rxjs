import { StoryFn, Meta } from '@storybook/react';
import { PaymentDetailsForm } from '../PaymentDetailsForm';

export default {
  title: 'screens/Payment Flow/PaymentDetailsForm',
  component: PaymentDetailsForm,
} as Meta<typeof PaymentDetailsForm>;

const Template: StoryFn<typeof PaymentDetailsForm> = (args) => <PaymentDetailsForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {};
