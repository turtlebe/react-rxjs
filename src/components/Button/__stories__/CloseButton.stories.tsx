import { StoryFn, Meta } from '@storybook/react';
import { CloseButton } from '../CloseButton';

export default {
  title: 'components/CloseButton',
  component: CloseButton,
} as Meta<typeof CloseButton>;

const Template: StoryFn<typeof CloseButton> = (args) => <CloseButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
