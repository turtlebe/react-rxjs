import { PaymentRequestSummary, ReceivableStatus } from 'api/types';

export enum TosStatusEnum {
  DRAFT = 'DRAFT',
  PAID = 'PAID',
  PROBLEM = 'PROBLEM',
  SUBMITTED = 'SUBMITTED',
}

export const statusWithProblem: ReceivableStatus[] = [
  'SETTLEMENT_OVERDUE',
  'IN_COLLECTION',
  'UNPAID_TO_BUYER',
  'DENIED',
  'UNKNOWN',
];

export const statusWithSubmitted: ReceivableStatus[] = ['SUBMITTED'];

export const statusWithDraft: ReceivableStatus[] = ['DRAFT'];

export const statusWithPaid: ReceivableStatus[] = ['SOLD', 'PAID_TO_CARRIER', 'SETTLED'];

export interface PaymentRequestCardSummary extends Omit<PaymentRequestSummary, 'deliveryDate'> {
  deliveryDate?: Date;
}

export type PaymentListResponse = {
  isEnd: boolean;
  requests: PaymentRequestCardSummary[];
  userHasRequests: boolean;
};
