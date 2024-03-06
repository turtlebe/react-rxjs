import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { PhoneInput } from '../PhoneInput';

export default {
  title: 'components/PhoneInput',
  component: PhoneInput,
} as Meta<typeof PhoneInput>;

const Template: StoryFn<typeof PhoneInput> = (args) => {
  const [value, setValue] = useState('');

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return <PhoneInput value={value} onChange={onChange} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Phone number',
};

export const Errored = Template.bind({});
Errored.args = {
  error: true,
  helperText: 'This is an error',
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  label: 'Phone number',
  validateNumber: true,
};
