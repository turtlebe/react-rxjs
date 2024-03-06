import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { CustomerOrderSection } from '../CustomerOrderSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/CustomerOrderSection',
  component: CustomerOrderSection,
  decorators: [withRouter()],
  args: {
    customerOrderNumber: MockOrder.orderDetails?.customerInformation.customerOrderNumber,
  },
} as Meta<typeof CustomerOrderSection>;

const Template: StoryFn<typeof CustomerOrderSection> = (args) => <CustomerOrderSection {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};

export const Empty = Template.bind({});
Empty.args = {
  customerOrderNumber: undefined,
};
