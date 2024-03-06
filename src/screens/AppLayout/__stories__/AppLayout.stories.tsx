import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes } from 'App';
import { refreshUser } from 'state/user';
import { AppLayout } from '../AppLayout';

export default {
  title: 'screens/AppLayout',
  component: AppLayout,
} as Meta<typeof AppLayout>;

const Template: StoryFn<typeof AppLayout> = () => {
  const router = createMemoryRouter(AppRoutes);

  useEffect(() => {
    refreshUser(true);
  }, []);

  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
