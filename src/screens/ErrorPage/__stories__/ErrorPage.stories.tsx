import { StoryFn, Meta } from '@storybook/react';
import { ErrorPage } from '../ErrorPage';

export default {
  title: 'screens/ErrorPage',
  component: ErrorPage,
} as Meta<typeof ErrorPage>;

const Template: StoryFn<typeof ErrorPage> = (args) => <ErrorPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  description: 'This is an error description.',
};

export const OverrideTitle = Template.bind({});
OverrideTitle.args = {
  title: 'An error has occurred',
  description: 'This is an error description.',
};

export const WithAction = Template.bind({});
WithAction.args = {
  description: 'This is an error description.',
  actionText: 'Retry',
  onAction: () => null,
};
