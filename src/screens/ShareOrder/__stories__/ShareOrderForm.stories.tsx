import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { MockOrder } from 'screens/shared/Order/__stories__/mock-data';
import { ShareOrderForm } from '../ShareOrderForm';

export default {
  title: 'screens/Orderbook/Actions/ShareOrder/ShareOrderForm',
  component: ShareOrderForm,
  decorators: [withRouter()],
  args: {
    order: MockOrder,
  },
} as Meta<typeof ShareOrderForm>;

const Template: StoryFn<typeof ShareOrderForm> = (args) => <ShareOrderForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
