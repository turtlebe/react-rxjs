import { StoryFn, Meta } from '@storybook/react';
import { OrderCreateInvoiceForm } from '../OrderCreateInvoiceForm';

export default {
  title: 'screens/Orderbook/Actions/CreateInvoice/OrderCreateInvoiceForm',
  component: OrderCreateInvoiceForm,
} as Meta<typeof OrderCreateInvoiceForm>;

const Template: StoryFn<typeof OrderCreateInvoiceForm> = (args) => (
  <OrderCreateInvoiceForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
