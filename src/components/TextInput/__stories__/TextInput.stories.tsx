import { StoryFn, Meta } from '@storybook/react';
import { TextInput } from '../TextInput';

export default {
  title: 'components/TextInput',
  component: TextInput,
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
  label: 'Field name',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Disabled',
  label: 'Field name',
  disabled: true,
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Password',
  label: 'Password',
  type: 'password',
};

export const Errored = Template.bind({});
Errored.args = {
  placeholder: 'Placeholder',
  label: 'Field name',
  error: true,
  helperText: 'Error message',
};
