import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Select } from '../Select';

export default {
  title: 'components/Select',
  component: Select,
  args: {
    options: [
      {
        value: 'AT',
        label: 'Austria',
      },
      {
        value: 'DE',
        label: 'Germany',
      },
      {
        value: 'GB',
        label: 'United Kingdom',
      },
    ],
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = useState('DE');

  return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
