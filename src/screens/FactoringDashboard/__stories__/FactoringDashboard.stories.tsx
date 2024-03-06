import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { refreshUser } from 'state/user';
import { withRouter } from 'utils/storybook/decorators';
import { FactoringDashboard } from '../FactoringDashboard';

export default {
  title: 'screens/Factoring/FactoringDashboard',
  component: FactoringDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter()],
} as Meta<typeof FactoringDashboard>;

const Template: StoryFn<typeof FactoringDashboard> = () => {
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <FactoringDashboard />;
};

export const Default = Template.bind({});
Default.args = {};
