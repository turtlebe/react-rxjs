import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { CustomerContactForm } from '../CustomerContactForm';

export default {
  title: 'screens/Payment Flow/CustomerContactForm',
  component: CustomerContactForm,
  decorators: [withRouter()],
} as Meta<typeof CustomerContactForm>;

const Template: StoryFn<typeof CustomerContactForm> = (args) => <CustomerContactForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    contactId: 'contact1',
    contactName: 'Anne Meier',
    email: 'anne@truck-os.de',
    phoneNumber: '+49123456789',
  },
};
