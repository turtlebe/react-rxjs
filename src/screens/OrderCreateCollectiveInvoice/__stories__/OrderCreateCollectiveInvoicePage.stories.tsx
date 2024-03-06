import { StoryFn, Meta } from '@storybook/react';
import { OrderCreateCollectiveInvoiceForm } from '../OrderCreateCollectiveInvoiceForm';

export default {
  title: 'screens/Orderbook/OrderCreateCollectiveInvoiceForm',
  component: OrderCreateCollectiveInvoiceForm,
} as Meta<typeof OrderCreateCollectiveInvoiceForm>;

const Template: StoryFn<typeof OrderCreateCollectiveInvoiceForm> = (args) => (
  <OrderCreateCollectiveInvoiceForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
