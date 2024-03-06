import { StoryFn, Meta } from '@storybook/react';
import { OrderUploadPodForm } from '../OrderUploadPodForm';

export default {
  title: 'screens/Orderbook/Actions/UploadPOD/UploadPodForm',
  component: OrderUploadPodForm,
} as Meta<typeof OrderUploadPodForm>;

const Template: StoryFn<typeof OrderUploadPodForm> = (args) => <OrderUploadPodForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
