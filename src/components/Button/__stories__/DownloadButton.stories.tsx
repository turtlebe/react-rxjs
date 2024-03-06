import { StoryFn, Meta } from '@storybook/react';
import { DownloadButton } from '../DownloadButton';

export default {
  title: 'components/DownloadButton',
  component: DownloadButton,
} as Meta<typeof DownloadButton>;

const Template: StoryFn<typeof DownloadButton> = (args) => <DownloadButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
