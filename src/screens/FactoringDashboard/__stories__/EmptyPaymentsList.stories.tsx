import { StoryFn, Meta } from '@storybook/react';
import { EmptyPaymentsList } from '../EmptyPaymentsList';

export default {
  title: 'screens/Factoring/EmptyPaymentsList',
  component: EmptyPaymentsList,
} as Meta<typeof EmptyPaymentsList>;

const Template: StoryFn<typeof EmptyPaymentsList> = () => <EmptyPaymentsList />;

export const Default = Template.bind({});
Default.args = {};
