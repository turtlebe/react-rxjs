import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { NavMenu } from '../NavMenu';

export default {
  title: 'components/NavMenu',
  component: NavMenu,
  decorators: [withRouter()],
} as Meta<typeof NavMenu>;

const Template: StoryFn<typeof NavMenu> = () => <NavMenu />;

export const Default = Template.bind({});
Default.args = {};
