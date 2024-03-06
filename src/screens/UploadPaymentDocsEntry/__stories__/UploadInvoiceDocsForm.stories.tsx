import { StoryFn, Meta } from '@storybook/react';
import { UploadInvoiceDocsForm } from '../UploadInvoiceDocsForm';

export default {
  title: 'screens/Payment Flow/UploadInvoiceDocsForm',
  component: UploadInvoiceDocsForm,
} as Meta<typeof UploadInvoiceDocsForm>;

const Template: StoryFn<typeof UploadInvoiceDocsForm> = (args) => (
  <UploadInvoiceDocsForm {...args} />
);

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    invoiceFilename: 'credit-note.pdf',
    invoiceUploadId: 'upload123',
    proofOfDeliveryFilename: 'proof-of-delivery.pdf',
    proofOfDeliveryUploadId: 'upload234',
    confirmInvoiceHasIban: true,
  },
};
