import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { MockOrder } from 'screens/shared/Order/__stories__/mock-data';
import { setSelectedCompanyId } from 'state/user';
import { path, paths } from 'paths';
import { ShareOrderPage, ShareOrderRoute } from '../ShareOrderPage';

export default {
  title: 'screens/Orderbook/Actions/ShareOrder/ShareOrderPage',
  component: ShareOrderPage,
} as Meta<typeof ShareOrderPage>;

const Template: StoryFn<typeof ShareOrderPage> = () => {
  const [storyOrderRoute] = ShareOrderRoute;

  const router = createMemoryRouter(
    [
      {
        ...storyOrderRoute,
        path: path(paths.root.orders.order.actions.shareOrder.path, ':orderId'),
      },
    ],
    {
      initialEntries: [`/share-order/${MockOrder.orderId}`],
    }
  );
  useEffect(() => {
    setSelectedCompanyId('company-id-444');
  }, []);
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
