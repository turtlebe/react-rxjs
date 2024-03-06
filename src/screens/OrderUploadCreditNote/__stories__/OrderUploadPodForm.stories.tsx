import { StoryFn, Meta } from '@storybook/react';
import { OrderUploadCreditNoteForm } from '../OrderUploadCreditNoteForm';

export default {
  title: 'screens/Orderbook/Actions/UploadCreditNote/UploadCreditNoteForm',
  component: OrderUploadCreditNoteForm,
} as Meta<typeof OrderUploadCreditNoteForm>;

const Template: StoryFn<typeof OrderUploadCreditNoteForm> = (args) => (
  <OrderUploadCreditNoteForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
