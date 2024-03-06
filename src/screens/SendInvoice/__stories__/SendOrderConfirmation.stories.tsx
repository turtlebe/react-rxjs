import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { refreshUser } from 'state/user';
import { SendInvoicePage, SendInvoiceRoute } from '../SendInvoicePage';

export default {
  title: 'screens/Orderbook/Actions/SendInvoice/SendInvoicePage',
  component: SendInvoicePage,
} as Meta<typeof SendInvoicePage>;

const Template: StoryFn<typeof SendInvoicePage> = () => {
  const router = createMemoryRouter(SendInvoiceRoute, {
    initialEntries: ['/send-invoice/document-123'],
  });
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
