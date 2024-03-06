import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { StipulationsSection } from '../StipulationsSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/StipulationsSection',
  component: StipulationsSection,
  decorators: [withRouter()],
  args: {
    stipulations: MockOrder.orderDetails?.stipulations,
  },
} as Meta<typeof StipulationsSection>;

const Template: StoryFn<typeof StipulationsSection> = (args) => <StipulationsSection {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};

export const Empty = Template.bind({});
Empty.args = {
  stipulations: undefined,
};
