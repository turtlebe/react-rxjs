import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { NextStepsSection } from '../NextStepsSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/NextStepsSection',
  component: NextStepsSection,
  decorators: [withRouter()],
  args: {
    order: MockOrder,
  },
} as Meta<typeof NextStepsSection>;

const Template: StoryFn<typeof NextStepsSection> = (args) => <NextStepsSection {...args} />;

export const Default = Template.bind({});
Default.args = {};
