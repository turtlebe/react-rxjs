import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { setSelectedCompanyId } from 'state/user';
import { path, paths } from 'paths';
import { SendPodPage, SendPodRoute } from '../SendPodPage';

export default {
  title: 'screens/Orderbook/Actions/SendPOD/SendPodPage',
  component: SendPodPage,
} as Meta<typeof SendPodPage>;

const Template: StoryFn<typeof SendPodPage> = () => {
  const [storySendPodRoute] = SendPodRoute;

  const router = createMemoryRouter(
    [
      {
        ...storySendPodRoute,
        path: path(paths.root.orders.order.actions.sendPod.path, ':documentId', ':orderId'),
      },
    ],
    {
      initialEntries: ['/send-pod/document-123/order_1'],
    }
  );
  useEffect(() => {
    setSelectedCompanyId('company-id-444');
  }, []);
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
