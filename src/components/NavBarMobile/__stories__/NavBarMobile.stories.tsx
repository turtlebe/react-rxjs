import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { NavBarMobile } from '../NavBarMobile';

export default {
  title: 'components/NavBarMobile',
  component: NavBarMobile,
  decorators: [withRouter()],
} as Meta<typeof NavBarMobile>;

const Template: StoryFn<typeof NavBarMobile> = (args) => <NavBarMobile {...args} />;

export const Default = Template.bind({});
Default.args = {};
