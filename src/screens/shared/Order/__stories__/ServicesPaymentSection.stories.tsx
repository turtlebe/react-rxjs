import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { ServicesPaymentSection } from '../ServicesPaymentSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/ServicesPaymentSection',
  component: ServicesPaymentSection,
  decorators: [withRouter()],
  args: {
    services: MockOrder?.orderDetails?.serviceAgreementDetails?.services,
    clearingSystem: MockOrder?.orderDetails?.clearingSystem,
    paymentTermDays: MockOrder?.orderDetails?.serviceAgreementDetails?.paymentTermDays,
  },
} as Meta<typeof ServicesPaymentSection>;

const Template: StoryFn<typeof ServicesPaymentSection> = (args) => (
  <ServicesPaymentSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Empty = Template.bind({});
Empty.args = {
  services: undefined,
  paymentTermDays: undefined,
};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};
