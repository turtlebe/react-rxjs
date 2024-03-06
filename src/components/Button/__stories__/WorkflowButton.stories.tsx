import { StoryFn, Meta } from '@storybook/react';
import { IconCircle } from 'components/IconCircle';
import { DocumentDone } from 'theme/icons';
import { WorkflowButton } from '../WorkflowButton';

export default {
  title: 'components/WorkflowButton',
  component: WorkflowButton,
} as Meta<typeof WorkflowButton>;

const Template: StoryFn<typeof WorkflowButton> = (args) => (
  <WorkflowButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Request new payment',
  startIcon: (
    <IconCircle>
      <DocumentDone />
    </IconCircle>
  ),
};
