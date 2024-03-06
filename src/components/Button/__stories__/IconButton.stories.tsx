import { StoryFn, Meta } from '@storybook/react';
import { Bin } from 'theme/icons';
import { IconButton } from '../IconButton';

export default {
  title: 'components/IconButton',
  component: IconButton,
  args: {
    children: <Bin />,
  },
} as Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'small',
};
