import { StoryFn, Meta } from '@storybook/react';
import { UploadCreditNoteDocsForm } from '../UploadCreditNoteDocsForm';

export default {
  title: 'screens/Payment Flow/UploadCreditNoteDocsForm',
  component: UploadCreditNoteDocsForm,
} as Meta<typeof UploadCreditNoteDocsForm>;

const Template: StoryFn<typeof UploadCreditNoteDocsForm> = (args) => (
  <UploadCreditNoteDocsForm {...args} />
);

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    creditNoteFilename: 'credit-note.pdf',
    creditNoteUploadId: 'upload123',
    proofOfDeliveryFilename: 'proof-of-delivery.pdf',
    proofOfDeliveryUploadId: 'upload234',
  },
};
