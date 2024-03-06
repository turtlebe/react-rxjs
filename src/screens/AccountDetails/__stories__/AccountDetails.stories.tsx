import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { refreshUser } from 'state/user';
import { AccountDetails, AccountDetailsRoute } from '../AccountDetails_OrderBook';

export default {
  title: 'screens/AccountDetails',
  component: AccountDetails,
} as Meta<typeof AccountDetails>;

const Template: StoryFn<typeof AccountDetails> = () => {
  const router = createMemoryRouter(AccountDetailsRoute, { initialEntries: ['/account/details'] });
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <RouterProvider router={router} />;
};

export const AccountDetailsPage = Template.bind({});
AccountDetailsPage.args = {};
