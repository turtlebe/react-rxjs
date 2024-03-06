import { StoryFn, Meta } from '@storybook/react';
import { UploadButton, UploadState } from '../UploadButton';

export default {
  title: 'components/UploadButton',
  component: UploadButton,
  args: {
    label: 'Upload invoice (pdf)',
    dropzoneProps: {
      accept: {
        'application/pdf': ['.pdf'],
      },
    },
  },
} as Meta<typeof UploadButton>;

const Template: StoryFn<typeof UploadButton> = (args) => <UploadButton {...args} />;

export const Ready = Template.bind({});
Ready.args = {
  state: UploadState.Ready,
};

export const UploadingNoProgress = Template.bind({});
UploadingNoProgress.args = {
  state: UploadState.Uploading,
};

export const UploadingInProgress = Template.bind({});
UploadingInProgress.args = {
  ...UploadingNoProgress.args,
  progress: 45,
};

export const Success = Template.bind({});
Success.args = {
  state: UploadState.Success,
};

export const Error = Template.bind({});
Error.args = {
  state: UploadState.Error,
};
