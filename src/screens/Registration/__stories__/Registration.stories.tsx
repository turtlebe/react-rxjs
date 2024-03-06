import { Meta, StoryFn } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Registration } from '../Registration';
import { baseRoutes } from '../../../App';

export default {
  title: 'screens/Registration',
  component: Registration,
} as Meta<typeof Registration>;

const Template: StoryFn<typeof Registration> = () => {
  const router = createMemoryRouter(baseRoutes, { initialEntries: ['/registration'] });

  return <RouterProvider router={router} />;
};

export const RegistrationPage = Template.bind({});
