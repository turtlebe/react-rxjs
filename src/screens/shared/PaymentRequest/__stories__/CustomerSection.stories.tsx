import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { CustomerSection } from '../CustomerSection';
import { MockPaymentRequest } from './mock-data';

export default {
  title: 'screens/Factoring/Payment Request/CustomerSection',
  component: CustomerSection,
  decorators: [withRouter()],
  args: {
    customerInformation: MockPaymentRequest.customerInformation,
    customerContact: MockPaymentRequest.customerContact,
  },
} as Meta<typeof CustomerSection>;

const Template: StoryFn<typeof CustomerSection> = (args) => <CustomerSection {...args} />;

export const Default = Template.bind({});
Default.args = {};
