import { StoryFn, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NavAccount, NavAccountFilled } from 'theme/icons';
import { NavButton } from '../NavButton';

export default {
  title: 'components/NavButton',
  component: NavButton,
  args: {
    label: 'Account',
    icon: <NavAccount />,
    selectedIcon: <NavAccountFilled />,
    to: '/home',
  },
} as Meta<typeof NavButton>;

const Template: StoryFn<typeof NavButton> = (args) => (
  <MemoryRouter>
    <NavButton {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
