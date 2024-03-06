import { OrderSummary, OrderStatus } from 'api/types';

export enum TosStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  PROBLEM = 'PROBLEM',
  SUCCESS = 'SUCCESS',
}

export const statusWithProblem: OrderStatus[] = ['OVERDUE', 'IN_COLLECTION', 'WRITEOFF'];

export const statusWithInProgress: OrderStatus[] = ['CREATED', 'DELIVERED', 'WAITING_FOR_PAYMENT'];

export const statusWithSuccess: OrderStatus[] = ['PAID'];

export interface OrderCardSummary extends Omit<Partial<OrderSummary>, 'deliveryDate'> {
  deliveryDate?: Date;
}

export type OrderListResponse = {
  isEnd?: boolean;
  orders?: OrderCardSummary[];
  userHasOrders?: boolean;
};
