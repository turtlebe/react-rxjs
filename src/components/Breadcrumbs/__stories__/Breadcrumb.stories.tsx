import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from '../../../utils/storybook/decorators';
import { Breadcrumb } from '../Breadcrumb';

export default {
  title: 'components/Breadcrumb',
  component: Breadcrumb,
  args: {
    label: 'Bank account',
    path: '/bank-account',
    position: 2,
    progress: 1,
  },
  decorators: [withRouter()],
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Pending = Template.bind({});
Pending.args = {
  progress: 1,
};

export const InProgress = Template.bind({});
InProgress.args = {
  progress: 2,
};

export const Complete = Template.bind({});
Complete.args = {
  progress: 3,
};
