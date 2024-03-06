import { StoryFn, Meta } from '@storybook/react';
import { PayoutSection } from '../PayoutSection';
import { MockPaymentRequest } from './mock-data';

export default {
  title: 'screens/Factoring/Payment Request/PayoutSection',
  component: PayoutSection,
  args: {
    ...MockPaymentRequest,
  },
} as Meta<typeof PayoutSection>;

const Template: StoryFn<typeof PayoutSection> = (args) => <PayoutSection {...args} />;

export const Default = Template.bind({});
Default.args = {};
