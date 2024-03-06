import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { CompanyDataMissing } from '../CompanyDataMissing';

export default {
  title: 'screens/Orderbook/CompanyDataMissing',
  component: CompanyDataMissing,
  decorators: [withRouter()],
} as Meta<typeof CompanyDataMissing>;

const Template: StoryFn<typeof CompanyDataMissing> = () => <CompanyDataMissing />;

export const Default = Template.bind({});
Default.args = {};
