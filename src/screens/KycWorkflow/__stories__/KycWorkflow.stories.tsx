import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { KycWorkflow, KycWorkflowRoutes } from '../KycWorkflow';

export default {
  title: 'screens/KYC/KycWorkflow',
  component: KycWorkflow,
} as Meta<typeof KycWorkflow>;

const Template: StoryFn<typeof KycWorkflow> = () => {
  const router = createMemoryRouter(KycWorkflowRoutes, { initialEntries: ['/kyc'] });

  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
