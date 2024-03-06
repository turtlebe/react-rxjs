import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DateTimeInput } from '../DateTimeInput';

export default {
  title: 'components/DateTimeInput',
  component: DateTimeInput,
} as Meta<typeof DateTimeInput>;

const Template: StoryFn<typeof DateTimeInput> = (args) => {
  const [value, setValue] = useState<Date | null>(args.value || null);

  return <DateTimeInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Date and time input',
};

export const Errored = Template.bind({});
Errored.args = {
  ...Default.args,
  error: true,
  helperText: 'Loading date and Time is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: new Date(),
};
