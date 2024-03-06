import { StoryFn, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NavFactoring, NavFactoringFilled } from 'theme/icons';
import { NavButtonMobile } from '../NavButtonMobile';

export default {
  title: 'components/NavButtonMobile',
  component: NavButtonMobile,
  args: {
    label: 'Payments',
    icon: <NavFactoring />,
    selectedIcon: <NavFactoringFilled />,
    to: '/home',
  },
} as Meta<typeof NavButtonMobile>;

const Template: StoryFn<typeof NavButtonMobile> = (args) => (
  <MemoryRouter>
    <NavButtonMobile {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
