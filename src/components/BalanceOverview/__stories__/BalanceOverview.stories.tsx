import { Meta, StoryFn } from '@storybook/react';
import { BalanceOverview } from '../BalanceOverview';

export default {
  title: 'components/BalanceOverview',
  component: BalanceOverview,
} as Meta<typeof BalanceOverview>;

const Template: StoryFn<typeof BalanceOverview> = (args) => <BalanceOverview {...args} />;

export const BalanceOverviewCards = Template.bind({});
BalanceOverviewCards.args = {
  openAmount: 0,
  receivedAmount: 0,
};
