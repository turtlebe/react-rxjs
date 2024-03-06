import { StoryFn, Meta } from '@storybook/react';
import { CircularProgress } from '../CircularProgress';

export default {
  title: 'components/CircularProgress',
  component: CircularProgress,
} as Meta<typeof CircularProgress>;

const Template: StoryFn<typeof CircularProgress> = (args) => (
  <CircularProgress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
};
