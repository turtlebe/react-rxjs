import { StoryFn, Meta } from '@storybook/react';
import { PdfViewer } from '../PdfViewer';

export default {
  title: 'components/PDFViewer',
  component: PdfViewer,
  args: {
    pdfUrl: '/files/TruckOS-Special-Conditions-DE.pdf',
  },
} as Meta<typeof PdfViewer>;

const Template: StoryFn<typeof PdfViewer> = (args) => <PdfViewer {...args} />;

export const Default = Template.bind({});
Default.args = {};
