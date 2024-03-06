import { StoryFn, Meta } from '@storybook/react';
import { Button } from '../Button';

export default {
  title: 'components/Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Secondary Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  color: 'tertiary',
  children: 'Tertiary Button',
};
