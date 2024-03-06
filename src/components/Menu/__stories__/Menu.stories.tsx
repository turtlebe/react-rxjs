import { Meta, StoryFn } from '@storybook/react';
import { Account, ArrowRight, Globe, Logout, Support, TermsConditions } from 'theme/icons';
import { Menu } from '../Menu';

export default {
  title: 'components/Menu',
  component: Menu,
} as Meta<typeof Menu>;

const Template: StoryFn<typeof Menu> = (args) => <Menu {...args} />;

export const AccountMainMenu = Template.bind({});
AccountMainMenu.args = {
  items: [
    {
      leftIcon: <Account />,
      rightIcon: <ArrowRight />,
      text: 'Account & company details',
      borderBottom: true,
    },
    {
      leftIcon: <TermsConditions />,
      rightIcon: <ArrowRight />,
      text: 'Terms & conditions',
      borderBottom: true,
    },
    {
      leftIcon: <Globe />,
      rightIcon: <ArrowRight />,
      text: 'Language',
    },
  ],
};

export const AccountBottomMenu = Template.bind({});
AccountBottomMenu.args = {
  items: [
    {
      leftIcon: <Support />,
      text: 'Contact truckOS',
      textColor: 'main',
      borderBottom: true,
    },
    {
      leftIcon: <Logout />,
      text: 'Log out',
      textColor: 'main',
    },
  ],
};
