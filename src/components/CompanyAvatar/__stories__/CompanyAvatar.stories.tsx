import { StoryFn, Meta } from '@storybook/react';
import { CompanyAvatar } from '../CompanyAvatar';

const DEFAULT_AVATAR = '/files/logo.png';

export default {
  title: 'components/CompanyAvatar',
  component: CompanyAvatar,
  args: {
    name: 'John Galt',
    companyName: 'Galt Transporte',
    avatarUrl: DEFAULT_AVATAR,
  },
} as Meta<typeof CompanyAvatar>;

const Template: StoryFn<typeof CompanyAvatar> = (args) => <CompanyAvatar {...args} />;

export const Default = Template.bind({});
Default.args = {};
