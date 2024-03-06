import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { SentSuccess } from '../SentSuccess';

const orderId = 'Dummy-order-1234';

export default {
  title: 'screens/shared/SentSuccess',
  component: SentSuccess,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routeState: {
        mainText: 'This is the main text',
        subText: 'This is the subtext',
      },
      routeParams: { orderId },
    },
  },
} as Meta<typeof SentSuccess>;

const Template: StoryFn<typeof SentSuccess> = () => <SentSuccess />;

export const Default = Template.bind({});
Default.args = {};
