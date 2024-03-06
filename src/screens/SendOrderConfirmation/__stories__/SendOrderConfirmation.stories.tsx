import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { refreshUser } from 'state/user';
import { SendOrderConfirmationPage, SendOrderConfirmationRoute } from '../SendOrderConfirmation';

export default {
  title: 'screens/Orderbook/Actions/SendOrderConfirmation/SendOrderConfirmationPage',
  component: SendOrderConfirmationPage,
} as Meta<typeof SendOrderConfirmationPage>;

const Template: StoryFn<typeof SendOrderConfirmationPage> = () => {
  const router = createMemoryRouter(SendOrderConfirmationRoute, {
    initialEntries: ['/order-confirmation/document-123'],
  });
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
