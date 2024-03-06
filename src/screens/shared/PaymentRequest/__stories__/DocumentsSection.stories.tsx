import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { DocumentsSection } from '../DocumentsSection';
import { MockPaymentRequest } from './mock-data';

export default {
  title: 'screens/Factoring/Payment Request/DocumentsSection',
  component: DocumentsSection,
  decorators: [withRouter()],
  args: {
    documents: MockPaymentRequest.documents,
  },
} as Meta<typeof DocumentsSection>;

const Template: StoryFn<typeof DocumentsSection> = (args) => <DocumentsSection {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const OnlyFilenames = Template.bind({});
OnlyFilenames.args = {
  showOnlyFilename: true,
};
