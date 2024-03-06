import { StoryFn, Meta } from '@storybook/react';
import { Radio } from '../Radio';

export default {
  title: 'components/Radio',
  component: Radio,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Radio>;

const Template: StoryFn<typeof Radio> = (args) => <Radio {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '',
  size: 'small',
};
