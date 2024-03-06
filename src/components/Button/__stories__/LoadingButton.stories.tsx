import { StoryFn, Meta } from '@storybook/react';
import { LoadingButton } from '../LoadingButton';

export default {
  title: 'components/LoadingButton',
  component: LoadingButton,
} as Meta<typeof LoadingButton>;

const Template: StoryFn<typeof LoadingButton> = (args) => (
  <LoadingButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Submit',
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Submit',
  loading: true,
};
