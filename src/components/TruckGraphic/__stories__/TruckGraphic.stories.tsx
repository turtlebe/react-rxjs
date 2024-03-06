import { StoryFn, Meta } from '@storybook/react';
import { TruckGraphic } from '../TruckGraphic';

export default {
  title: 'components/TruckGraphic',
  component: TruckGraphic,
} as Meta<typeof TruckGraphic>;

const Template: StoryFn<typeof TruckGraphic> = (args) => <TruckGraphic {...args} />;

export const Default = Template.bind({});
Default.args = {};
