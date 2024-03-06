export const paths = {
  root: {
    path: '/',
    admin: {
      path: 'admin',
      supportAccount: { path: 'support-account' },
    },
    account: {
      path: 'account',
      details: { path: 'account/details' },
      uploadLogo: { path: 'account/upload-logo' },
      termsAndConditions: { path: 'account/terms-conditions' },
      languageSettings: { path: 'account/language-settings' },
    },
    logout: { path: 'logout' },
    registration: { path: 'registration' },
    wall: { path: 'wall' },
    factoring: {
      path: 'factoring',
      payment: { path: 'payment' },
      createPayment: {
        path: 'create-payment',
        customerSelection: { path: 'customer-selection' },
        newCustomer: { path: 'new-customer' },
        customerContact: { path: 'customer-contact' },
        paymentDetails: { path: 'payment-details' },
        uploadDocuments: { path: 'upload-documents' },
        confirmation: { path: 'confirmation' },
        paymentSubmitted: { path: 'payment-submitted' },
      },
    },
    orders: {
      path: 'orders',
      order: {
        path: 'order',
        create: {
          path: 'create',
          customerSelection: { path: 'customer-selection' },
          newCustomer: { path: 'new-customer' },
          customerContacts: { path: 'customer-contact' },
        },
        edit: {
          path: 'edit',
          orderDetails: { path: 'order-details' },
          customerContacts: { path: 'edit-customer-contact' },
        },
        actions: {
          path: 'actions',
          orderConfirmation: { path: 'order-confirmation' },
          createInvoice: { path: 'create-invoice' },
          sendInvoice: { path: 'send-invoice' },
          uploadOrder: { path: 'upload-order' },
          uploadPod: { path: 'upload-pod' },
          sendPod: { path: 'send-pod' },
          uploadCreditNote: { path: 'upload-credit-note' },
          shareOrder: { path: 'share-order' },
          recordPayment: { path: 'record-payment' },
          success: { path: 'success' },
        },
      },
      invoice: {
        path: 'invoice',
        createCollectiveInvoice: { path: 'create-collective-invoice' },
        sendCollectiveInvoice: { path: 'send-collective-invoice' },
      },
    },
    kyc: {
      path: 'kyc',
      bankAccount: { path: 'bank-account' },
      beneficialOwners: { path: 'beneficial-owners' },
      businessData: { path: 'business-data' },
      kycSubmitted: { path: 'kyc-submitted' },
      legalRepresentatives: { path: 'legal-reps' },
    },
    kycLight: {
      path: 'kyc-light',
    },
    noMatchRoute: { path: '*' },
  },
};

export const pathBase = (path: string) => `${path}${path !== '/' ? '/' : ''}`;

export const path = (...parts: string[]) => parts.join('/');

export const fromRoot = (...parts: string[]) => `/${path(...parts)}`;

export const sibling = (...parts: string[]) => `../${path(...parts)}`;

export const parent = (...parts: string[]) => `../../${path(...parts)}`;
