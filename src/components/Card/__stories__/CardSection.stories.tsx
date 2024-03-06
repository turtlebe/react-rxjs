import { StoryFn, Meta } from '@storybook/react';
import { Pen } from 'theme/icons';
import { CardLineItem } from '../CardLineItem';
import { CardSection } from '../CardSection';

export default {
  title: 'components/CardSection',
  component: CardSection,
} as Meta<typeof CardSection>;

const Template: StoryFn<typeof CardSection> = (args) => <CardSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Payment details',
  children: (
    <>
      <CardLineItem label="Invoice number" value="R2022-283" />
      <CardLineItem label="Delivery date" value="07.06.2022" />
      <CardLineItem label="Payment terms" value="45 days" />
    </>
  ),
};

export const WithHeaderElement = Template.bind({});
WithHeaderElement.args = {
  title: 'Payment details',
  rightHeaderElement: <Pen />,
  children: (
    <>
      <CardLineItem label="Invoice number" value="R2022-283" />
      <CardLineItem label="Delivery date" value="07.06.2022" />
      <CardLineItem label="Payment terms" value="45 days" />
    </>
  ),
};
