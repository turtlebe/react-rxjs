import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { SupportAccount, SupportAccountRoute } from '../SupportAccount';

export default {
  title: 'screens/SupportAccount',
  component: SupportAccount,
} as Meta<typeof SupportAccount>;

const Template: StoryFn<typeof SupportAccount> = () => {
  const router = createMemoryRouter(SupportAccountRoute, { initialEntries: ['/support-account'] });
  return <RouterProvider router={router} />;
};

export const SupportAccountPage = Template.bind({});
SupportAccountPage.args = {};
