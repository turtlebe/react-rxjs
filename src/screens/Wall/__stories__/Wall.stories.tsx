import { Meta, StoryFn } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Wall } from '../Wall';
import { baseRoutes } from '../../../App';

export default {
  title: 'screens/Wall',
  component: Wall,
} as Meta<typeof Wall>;

const Template: StoryFn<typeof Wall> = () => {
  const router = createMemoryRouter(baseRoutes, { initialEntries: ['/wall'] });

  return <RouterProvider router={router} />;
};

export const WallPage = Template.bind({});
