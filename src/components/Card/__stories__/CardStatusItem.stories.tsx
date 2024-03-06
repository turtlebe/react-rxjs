import { StoryFn, Meta } from '@storybook/react';
import { CardStatusItem } from '../CardStatusItem';

export default {
  title: 'components/CardStatusItem',
  component: CardStatusItem,
} as Meta<typeof CardStatusItem>;

const Template: StoryFn<typeof CardStatusItem> = (args) => <CardStatusItem {...args} />;
const MultipleTemplate: StoryFn<typeof CardStatusItem> = (args) => (
  <>
    <CardStatusItem {...args} />
    <CardStatusItem {...args} />
    <CardStatusItem {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Order Confirmation',
  value: '12.02.2023',
  onClick: undefined,
};

export const Completed = Template.bind({});
Completed.args = {
  isCompleted: true,
  label: 'Order Confirmation',
  value: '12.02.2023',
  onClick: undefined,
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  label: 'Order Confirmation',
  value: '12.02.2023',
  onClick: undefined,
};

export const Clickable = MultipleTemplate.bind({});
Clickable.args = {
  label: 'Order Confirmation',
  value: 'Create now',
  onClick: () => null,
};
