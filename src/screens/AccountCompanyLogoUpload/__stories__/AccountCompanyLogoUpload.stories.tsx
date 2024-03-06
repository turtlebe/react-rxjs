import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { refreshUser } from 'state/user';
import {
  AccountCompanyLogoUpload,
  AccountCompanyLogoUploadRoute,
} from '../AccountCompanyLogoUpload';

export default {
  title: 'screens/AccountCompanyLogoUpload',
  component: AccountCompanyLogoUpload,
} as Meta<typeof AccountCompanyLogoUpload>;

const Template: StoryFn<typeof AccountCompanyLogoUpload> = () => {
  const router = createMemoryRouter(AccountCompanyLogoUploadRoute, {
    initialEntries: ['/account/upload-logo'],
  });
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <RouterProvider router={router} />;
};

export const AccountCompanyLogoUploadPage = Template.bind({});
AccountCompanyLogoUploadPage.args = {};
