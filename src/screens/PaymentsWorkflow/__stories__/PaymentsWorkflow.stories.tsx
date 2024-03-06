import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { setSelectedCompanyId } from 'state/user';
import { PaymentsWorkflow, PaymentsWorkflowRoutes } from '../PaymentsWorkflow';

export default {
  title: 'screens/Payment Flow/PaymentsWorkflow',
  component: PaymentsWorkflow,
} as Meta<typeof PaymentsWorkflow>;

const Template: StoryFn<typeof PaymentsWorkflow> = () => {
  const router = createMemoryRouter(PaymentsWorkflowRoutes, {
    initialEntries: ['/create-payment/some-id'],
  });

  useEffect(() => {
    setSelectedCompanyId('company1');
  }, []);

  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
