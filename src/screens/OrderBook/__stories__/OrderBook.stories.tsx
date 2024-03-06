import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { refreshUser } from 'state/user';
import { withRouter } from 'utils/storybook/decorators';
import { OrderBook } from '../OrderBook';

export default {
  title: 'screens/Orderbook/OrderBook',
  component: OrderBook,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter()],
} as Meta<typeof OrderBook>;

const Template: StoryFn<typeof OrderBook> = () => {
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <OrderBook />;
};

export const Default = Template.bind({});
Default.args = {};
