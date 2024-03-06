import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from '../../../utils/storybook/decorators';
import { Breadcrumbs } from '../Breadcrumbs';

export default {
  title: 'components/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    breadcrumbs: [
      {
        label: 'Business data',
        path: 'business-data',
      },
      {
        label: 'Bank account',
        path: 'bank-account',
      },
      {
        label: 'Legal rep.',
        path: 'legal-rep',
      },
      {
        label: 'Beneficial owners',
        path: 'beneficial-owners',
      },
    ],
    progress: 2,
  },
  decorators: [withRouter()],
} as Meta<typeof Breadcrumbs>;

const Template: StoryFn<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const AllComplete = Template.bind({});
AllComplete.args = {
  progress: 5,
};
