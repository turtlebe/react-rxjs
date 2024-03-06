import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { KycSubmitted } from '../KycSubmitted';

export default {
  title: 'screens/KYC/KycComplete',
  component: KycSubmitted,
  decorators: [withRouter()],
} as Meta<typeof KycSubmitted>;

const Template: StoryFn<typeof KycSubmitted> = () => <KycSubmitted />;

export const Default = Template.bind({});
Default.args = {};
