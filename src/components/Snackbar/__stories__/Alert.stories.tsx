import { StoryFn, Meta } from '@storybook/react';
import { Alert } from '../Alert';

export default {
  title: 'components/Alert',
  component: Alert,
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  children: 'This is a success message!',
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  children: 'This is an error message!',
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
  children: 'This is a warning message!',
};

export const Info = Template.bind({});
Info.args = {
  severity: 'info',
  children: 'This is an info message!',
};
