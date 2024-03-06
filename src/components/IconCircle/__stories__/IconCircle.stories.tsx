import { StoryFn, Meta } from '@storybook/react';
import { DocumentDone } from 'theme/icons';
import { IconCircle } from '../IconCircle';

export default {
  title: 'components/IconCircle',
  component: IconCircle,
} as Meta<typeof IconCircle>;

const Template: StoryFn<typeof IconCircle> = (args) => <IconCircle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <DocumentDone />,
};
