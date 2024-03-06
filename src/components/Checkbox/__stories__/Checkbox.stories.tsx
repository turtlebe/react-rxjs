import { StoryFn, Meta } from '@storybook/react';
import { Checkbox } from '../Checkbox';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'This is a checkbox label',
  size: 'small',
};
