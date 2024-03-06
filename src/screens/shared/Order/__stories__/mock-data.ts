import { Order } from 'api/types';

export const MockOrder: Order = {
  orderId: 'order123',
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
  orderDetails: {
    status: 'CREATED',
    clearingSystem: 'invoice',
    customerInformation: {
      customerOrderNumber: 'KN-23-2078',
      customerCompany: {
        companyId: 'company-14251',
        companyName: 'DB Schenker',
        details: {
          companyType: 'Freight Forwarder',
          address: {
            streetAndNumber: 'Feilchenweg 3',
            addressAddOn: '',
            city: 'Stuttgart',
            postcode: '15673',
            country: 'Deutschland',
          },
        },
      },
      contacts: {
        dispositionContact: {
          companyId: 'company-14251',
          contactId: 'contact-345',
          contactName: 'Michael Müller',
          contactDetails: {
            email: 'michael@mueller-transporte.de',
            phoneNumber: '+49-177-3680448',
          },
        },
        bookkeepingContact: {
          companyId: 'company-14251',
          contactId: 'contact-345',
          contactName: 'Lea Schmidt',
          contactDetails: {
            email: 'lea@mueller-transporte.de',
            phoneNumber: '+49-177-3680446',
          },
        },
      },
    },
    loadDetails: {
      loadingTimeAndPlace: {
        timeWindow: {
          start: '2023-02-03T12:00:00.000Z',
          end: '2023-02-03T13:00:00.000Z',
        },
        venue: {
          venueId: 'venue12345',
          venueName: 'Südost Fruchtkontor',
          address: {
            streetAndNumber: 'Luisenstr. 51',
            city: 'München',
            postcode: '80803',
            country: 'Deutschland',
          },
        },
      },
      unloadingTimeAndPlace: {
        timeWindow: {
          start: '2023-02-04T12:00:00.000Z',
          end: '2023-02-04T13:00:00.000Z',
        },
        venue: {
          venueId: 'venue12346',
          venueName: 'Nordwest Fruchtkontor',
          address: {
            streetAndNumber: 'Große Bleichen 33',
            city: 'Hamburg',
            postcode: '20354',
            country: 'Deutschland',
          },
        },
      },
      loadDescription: '50 Paletten Bananen',
    },
    stipulations: ['This is the first stipulation', 'This is stipulation 2'],
    serviceAgreementDetails: {
      paymentTermDays: 45,
      currency: 'EUR',
      services: [
        {
          service: 'Freight transport',
          netAmount: 1003.6,
        },
        {
          service: '20x Pallets',
          netAmount: 200.0,
        },
      ],
    },
  },
  documentDetails: [
    {
      documentId: 'doc-21352',
      documentType: 'Order',
      documentActions: ['download', 'delete'],
      fileMetadata: {
        fileName: 'Order_Confirmation_Wolfrum_2022-283.pdf',
        contentType: 'pdf',
      },
    },
    {
      documentId: '',
      documentType: 'OrderConfirmation',
      documentActions: ['SendOrderConfirmation'],
      fileMetadata: {
        fileName: '',
        contentType: '',
      },
    },
    {
      documentId: 'doc-21353',
      documentType: 'ProofOfDelivery',
      documentActions: ['UploadProofOfDelivery'],
      fileMetadata: {
        fileName: 'Order_Confirmation_Wolfrum_2022-283.pdf',
        contentType: 'pdf',
      },
    },
    {
      documentId: 'doc-21354',
      documentType: 'Invoice',
      documentActions: [],
      fileMetadata: {
        fileName: 'Order_Confirmation_Wolfrum_2022-283.pdf',
        contentType: 'pdf',
      },
    },
    {
      documentId: 'doc-21355',
      documentType: 'CreditNote',
      documentActions: ['UploadCreditNote'],
      fileMetadata: {
        fileName: 'Credit_Note_Wolfrum_2022-283.pdf',
        contentType: 'pdf',
      },
    },
  ],
  workflowAvailableActions: [
    'SendOrderConfirmation',
    'UploadProofOfDelivery',
    'ShareWithDriver',
    'DeleteOrder',
  ],
};
