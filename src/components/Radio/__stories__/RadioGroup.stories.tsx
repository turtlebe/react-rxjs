import { StoryFn, Meta } from '@storybook/react';
import { RadioGroup } from '../RadioGroup';

export default {
  title: 'components/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Gender',
    options: [
      {
        label: 'Female',
        value: 'female',
      },
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Other',
        value: 'other',
      },
    ],
  },
} as Meta<typeof RadioGroup>;

const Template: StoryFn<typeof RadioGroup> = (args) => <RadioGroup {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Errored = Template.bind({});
Errored.args = {
  error: true,
  helperText: 'This is an error',
};
