import { StoryFn, Meta } from '@storybook/react';
import { CardLineItem } from '../CardLineItem';

export default {
  title: 'components/CardLineItem',
  component: CardLineItem,
} as Meta<typeof CardLineItem>;

const Template: StoryFn<typeof CardLineItem> = (args) => <CardLineItem {...args} />;
const MultipleTemplate: StoryFn<typeof CardLineItem> = (args) => (
  <>
    <CardLineItem {...args} />
    <CardLineItem {...args} />
    <CardLineItem {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Invoice number',
  value: 'R2022-283',
};

export const RightValueAlignment = Template.bind({});
RightValueAlignment.args = {
  label: 'Invoice number',
  value: 'R2022-283',
  valueAlignment: 'right',
};

export const PrimaryValue = Template.bind({});
PrimaryValue.args = {
  label: 'Invoice number',
  value: 'R2022-283',
  primaryValue: true,
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  label: 'Invoice number',
  value: 'R2022-283',
};

export const Clickable = MultipleTemplate.bind({});
Clickable.args = {
  label: 'Invoice number',
  value: 'R2022-283',
  onClick: () => null,
};
