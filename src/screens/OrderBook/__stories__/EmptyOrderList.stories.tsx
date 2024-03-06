import { StoryFn, Meta } from '@storybook/react';
import { EmptyOrderList } from '../EmptyOrderList';

export default {
  title: 'screens/Orderbook/EmptyOrderList',
  component: EmptyOrderList,
} as Meta<typeof EmptyOrderList>;

const Template: StoryFn<typeof EmptyOrderList> = () => <EmptyOrderList />;

export const Default = Template.bind({});
Default.args = {};
