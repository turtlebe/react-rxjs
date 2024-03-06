import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { FactoringNotVerified } from '../FactoringNotVerified';

export default {
  title: 'screens/Factoring/FactoringNotVerified',
  component: FactoringNotVerified,
  decorators: [withRouter()],
} as Meta<typeof FactoringNotVerified>;

const Template: StoryFn<typeof FactoringNotVerified> = () => <FactoringNotVerified />;

export const Default = Template.bind({});
Default.args = {};
