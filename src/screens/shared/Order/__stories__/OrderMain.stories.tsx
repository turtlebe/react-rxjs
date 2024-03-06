import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { OrderMain } from '../OrderMain';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/OrderMain',
  component: OrderMain,
  decorators: [withRouter()],
  args: {
    order: MockOrder,
  },
} as Meta<typeof OrderMain>;

const Template: StoryFn<typeof OrderMain> = (args) => <OrderMain {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};
