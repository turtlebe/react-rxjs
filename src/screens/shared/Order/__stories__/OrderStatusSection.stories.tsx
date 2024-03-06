import { StoryFn, Meta } from '@storybook/react';
import { withRouter } from 'utils/storybook/decorators';
import { OrderStatusSection } from '../OrderStatusSection';
import { MockOrder } from './mock-data';

export default {
  title: 'screens/Orderbook/Order/OrderStatusSection',
  component: OrderStatusSection,
  decorators: [withRouter()],
  args: {
    order: MockOrder,
  },
} as Meta<typeof OrderStatusSection>;

const Template: StoryFn<typeof OrderStatusSection> = (args) => <OrderStatusSection {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const InvoiceConfirmed = Template.bind({});
InvoiceConfirmed.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['UploadProofOfDelivery'],
        },
        {
          stepName: 'InvoiceSent',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const InvoiceOrderCompleted = Template.bind({});
InvoiceOrderCompleted.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'InvoiceSent',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['SendInvoice'],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const InvoiceSent = Template.bind({});
InvoiceSent.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'InvoiceSent',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-12T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['RecordPayment'],
        },
      ],
    },
  },
};

export const InvoicePaymentReceived = Template.bind({});
InvoicePaymentReceived.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'InvoiceSent',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-12T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-03-12T00:00:00.000Z',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const InvoicePaymentReceivedNoConfirmation = Template.bind({});
InvoicePaymentReceivedNoConfirmation.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Skipped',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: ['UploadProofOfDelivery'],
        },
        {
          stepName: 'InvoiceSent',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-12T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-03-12T00:00:00.000Z',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const CreditNoteOpen = Template.bind({});
CreditNoteOpen.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['SendOrderConfirmation'],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['UploadProofOfDelivery'],
        },
        {
          stepName: 'PODSent',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
        {
          stepName: 'CreditNoteReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const CreditNoteConfirmed = Template.bind({});
CreditNoteConfirmed.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['UploadProofOfDelivery'],
        },
        {
          stepName: 'PODSent',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
        {
          stepName: 'CreditNoteReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const CreditNoteDelivered = Template.bind({});
CreditNoteDelivered.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODSent',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['SendProofOfDelivery'],
        },
        {
          stepName: 'CreditNoteReceived',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['UploadCreditNote'],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'NotReady',
          stepCompletionDate: '',
          stepAvailableActions: [],
        },
      ],
    },
  },
};

export const CreditNoteSent = Template.bind({});
CreditNoteSent.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODSent',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'CreditNoteReceived',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['UploadCreditNote'],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['RecordPayment'],
        },
      ],
    },
  },
};

export const CreditNoteReceived = Template.bind({});
CreditNoteReceived.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODSent',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'CreditNoteReceived',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-13T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'Actionable',
          stepCompletionDate: '',
          stepAvailableActions: ['RecordPayment'],
        },
      ],
    },
  },
};

export const CreditNotePaymentReceived = Template.bind({});
CreditNotePaymentReceived.args = {
  order: {
    ...MockOrder,
    orderWorkflow: {
      workflowSteps: [
        {
          stepName: 'OrderConfirmation',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-09T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODUploaded',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PODSent',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-11T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'CreditNoteReceived',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-02-13T00:00:00.000Z',
          stepAvailableActions: [],
        },
        {
          stepName: 'PaymentReceived',
          stepStatus: 'Complete',
          stepCompletionDate: '2023-03-13T00:00:00.000Z',
          stepAvailableActions: [],
        },
      ],
    },
  },
};
