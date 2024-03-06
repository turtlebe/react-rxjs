import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { OrderDocumentsSection } from '../OrderDocumentsSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/OrderDocumentsSection',
  component: OrderDocumentsSection,
  decorators: [withRouter()],
} as Meta<typeof OrderDocumentsSection>;

const Template: StoryFn<typeof OrderDocumentsSection> = (args) => (
  <OrderDocumentsSection {...args} />
);

export const Invoice = Template.bind({});
Invoice.args = {
  order: MockOrder,
};

export const CreditNote = Template.bind({});
CreditNote.args = {
  order: {
    ...MockOrder,
    orderDetails: {
      clearingSystem: 'credit_note',
      customerInformation: {},
    },
  },
};
