import { OrderWorkflowAction } from 'api/types';
import { paths } from 'paths';

export const useOrderWorkflowActionPaths = (action: OrderWorkflowAction) => {
  switch (action) {
    case 'UploadOrder':
      return paths.root.orders.order.actions.uploadOrder.path;
    case 'SendOrderConfirmation':
      return paths.root.orders.order.actions.orderConfirmation.path;
    case 'UploadProofOfDelivery':
      return paths.root.orders.order.actions.uploadPod.path;
    case 'SendInvoice':
      return paths.root.orders.order.actions.createInvoice.path;
    case 'SendProofOfDelivery':
      return paths.root.orders.order.actions.sendPod.path;
    case 'UploadCreditNote':
      return paths.root.orders.order.actions.uploadCreditNote.path;
    case 'RecordPayment':
      return paths.root.orders.order.actions.recordPayment.path;
    case 'FactorOrder':
      return paths.root.orders.path;
    case 'DeleteOrder':
      return paths.root.orders.path;
    case 'ShareWithDriver':
      return paths.root.orders.order.actions.shareOrder.path;
    default:
      return paths.root.orders.path;
  }
};
