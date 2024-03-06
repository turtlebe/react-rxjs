import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { OrderCustomerContactForm } from '../OrderCustomerContactForm';

export default {
  title: 'screens/Order Flow/OrderCustomerContactForm',
  component: OrderCustomerContactForm,
  decorators: [withRouter()],
} as Meta<typeof OrderCustomerContactForm>;

const Template: StoryFn<typeof OrderCustomerContactForm> = (args) => (
  <OrderCustomerContactForm {...args} />
);

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    bookKeepingContactId: 'contact1',
    bookKeepingContactName: 'Anne Meier',
    bookKeepingEmail: 'anne@truck-os.de',
    bookKeepingPhoneNumber: '+49123456789',
    dispositionContactId: 'contact2',
    dispositionContactName: 'Anne Meier',
    dispositionEmail: 'anne@truck-os.de',
    dispositionPhoneNumber: '+49123456789',
  },
};
