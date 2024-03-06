import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { PaymentsWorkflowRoutes } from 'screens/PaymentsWorkflow';
import { setSelectedCompanyId } from 'state/user';
import { CustomerSelection } from '../CustomerSelection';

export default {
  title: 'screens/Payment Flow/CustomerSelection',
  component: CustomerSelection,
} as Meta<typeof CustomerSelection>;

const Template: StoryFn<typeof CustomerSelection> = () => {
  useEffect(() => {
    setSelectedCompanyId('company1');
  }, []);

  const router = createMemoryRouter(PaymentsWorkflowRoutes, {
    initialEntries: ['/create-payment/payment1/customer-selection'],
  });

  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
