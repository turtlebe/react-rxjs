import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { NumberInput } from '../NumberInput';

export default {
  title: 'components/NumberInput',
  component: NumberInput,
} as Meta<typeof NumberInput>;

const Template: StoryFn<typeof NumberInput> = (args) => {
  const [value, setValue] = useState<number | null>(null);
  return <NumberInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithMin = Template.bind({});
WithMin.args = {
  min: 0,
};

export const WithMax = Template.bind({});
WithMax.args = {
  max: 20,
};

export const WithDecimals = Template.bind({});
WithDecimals.args = {
  decimals: 1,
};

export const WithUnit = Template.bind({});
WithUnit.args = {
  unit: 'days',
};
