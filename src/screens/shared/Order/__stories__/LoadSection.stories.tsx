import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { LoadSection } from '../LoadSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/LoadSection',
  component: LoadSection,
  decorators: [withRouter()],
  args: {
    loadDescription: MockOrder.orderDetails?.loadDetails?.loadDescription,
  },
} as Meta<typeof LoadSection>;

const Template: StoryFn<typeof LoadSection> = (args) => <LoadSection {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};

export const Empty = Template.bind({});
Empty.args = {
  loadDescription: undefined,
};
