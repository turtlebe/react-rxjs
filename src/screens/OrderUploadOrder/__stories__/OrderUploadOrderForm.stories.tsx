import { StoryFn, Meta } from '@storybook/react';
import { OrderUploadOrderForm } from '../OrderUploadOrderForm';

export default {
  title: 'screens/Orderbook/Actions/UploadOrder/UploadOrderForm',
  component: OrderUploadOrderForm,
} as Meta<typeof OrderUploadOrderForm>;

const Template: StoryFn<typeof OrderUploadOrderForm> = (args) => <OrderUploadOrderForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
