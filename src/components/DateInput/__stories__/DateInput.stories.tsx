import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DateInput } from '../DateInput';

export default {
  title: 'components/DateInput',
  component: DateInput,
} as Meta<typeof DateInput>;

const Template: StoryFn<typeof DateInput> = (args) => {
  const [value, setValue] = useState<Date | null>(args.value || null);

  return <DateInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Date input',
};

export const Errored = Template.bind({});
Errored.args = {
  ...Default.args,
  error: true,
  helperText: 'Invoice date is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: new Date(),
};
