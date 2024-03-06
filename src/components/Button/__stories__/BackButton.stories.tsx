import { StoryFn, Meta } from '@storybook/react';
import { BackButton } from '../BackButton';

export default {
  title: 'components/BackButton',
  component: BackButton,
} as Meta<typeof BackButton>;

const Template: StoryFn<typeof BackButton> = (args) => <BackButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Back to sign in',
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Back to sign in',
  color: 'primary',
};
