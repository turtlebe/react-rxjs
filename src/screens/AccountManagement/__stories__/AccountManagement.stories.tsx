import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { refreshUser } from 'state/user';
import { withRouter } from 'utils/storybook/decorators';
import { AccountManagement } from '../AccountManagement';

export default {
  title: 'screens/AccountManagement',
  component: AccountManagement,
  decorators: [withRouter()],
} as Meta<typeof AccountManagement>;

const Template: StoryFn = (args) => {
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <AccountManagement {...args} />;
};

export const AccountManagementPage = Template.bind({});
