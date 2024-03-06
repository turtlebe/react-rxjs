import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { CustomerSection } from '../CustomerSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/CustomerSection',
  component: CustomerSection,
  decorators: [withRouter()],
  args: {
    contacts: MockOrder.orderDetails?.customerInformation.contacts,
    companyName: MockOrder.orderDetails?.customerInformation.customerCompany?.companyName,
    address: MockOrder.orderDetails?.customerInformation.customerCompany?.details?.address,
  },
} as Meta<typeof CustomerSection>;

const Template: StoryFn<typeof CustomerSection> = (args) => <CustomerSection {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};

export const ContactsEmpty = Template.bind({});
ContactsEmpty.args = {
  contacts: undefined,
};
