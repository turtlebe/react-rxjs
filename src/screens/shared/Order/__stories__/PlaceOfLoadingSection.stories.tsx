import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { PlaceOfLoadingSection } from '../PlaceOfLoadingSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/PlaceOfLoadingSection',
  component: PlaceOfLoadingSection,
  decorators: [withRouter()],
  args: {
    venue: MockOrder.orderDetails?.loadDetails?.loadingTimeAndPlace?.venue,
    timeWindow: MockOrder.orderDetails?.loadDetails?.loadingTimeAndPlace?.timeWindow,
  },
} as Meta<typeof PlaceOfLoadingSection>;

const Template: StoryFn<typeof PlaceOfLoadingSection> = (args) => (
  <PlaceOfLoadingSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const HideEdit = Template.bind({});
HideEdit.args = {
  hideEdit: true,
};

export const Empty = Template.bind({});
Empty.args = {
  venue: undefined,
  timeWindow: undefined,
};
