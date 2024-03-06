import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { setSelectedCompanyId } from 'state/user';
import { OrderCreationRoutes } from 'screens/OrderCreation';
import { CreateOrderCustomerSelectionPage } from '../CreateOrderCustomerSelectionPage';

export default {
  title: 'screens/Order Flow/CustomerSelection',
  component: CreateOrderCustomerSelectionPage,
} as Meta<typeof CreateOrderCustomerSelectionPage>;

const Template: StoryFn<typeof CreateOrderCustomerSelectionPage> = () => {
  useEffect(() => {
    setSelectedCompanyId('company1');
  }, []);

  const router = createMemoryRouter(OrderCreationRoutes, {
    initialEntries: ['/create-order/customer-selection'],
  });

  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
