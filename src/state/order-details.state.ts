import { Observable, shareReplay, switchMap } from 'rxjs';
import { isArray, mergeWith } from 'lodash';
import { apiGetOrder, apiUpdateOrderDetails } from '../api/orders.api';
import { Order, OrderDetails } from '../api/types';
import { nonEmptySelectedCompanyId$ } from './user';

const dummyMapper = (value: Order | undefined) => value;
export const getMappedOrderObservable = <TMapTo>(
  orderId: string,
  mapper: (value: Order | undefined) => TMapTo | undefined
): Observable<TMapTo | undefined> =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => apiGetOrder({ companyId, orderId }, mapper)),
    shareReplay(1)
  );

export const getOrderObservable = (orderId: string): Observable<Order | undefined> =>
  getMappedOrderObservable(orderId, dummyMapper);

// eslint-disable-next-line consistent-return
const orderMergeCustomizer = (objectValue: any, srcValue: any, key: string) => {
  switch (key) {
    // There may be a better way, but CTFU for now.
    case 'bookkeepingContact':
    case 'dispositionContact':
    case 'timeWindow':
      if (srcValue) {
        return srcValue;
      }
      break;
    default:
      // If it's an array, replace (vs concat which seems like the standard behaviour)
      if (isArray(objectValue)) {
        return srcValue;
      }
      // Undefined means that merge will go back to its standard merge mechanism - which works for everything else that is not an array.
      return undefined;
  }
};

export const updateOrderDetails = (originalOrder: Order, updateDetails: Partial<OrderDetails>) => {
  const orderId = originalOrder!.orderId!;
  const mergedOrderDetails = mergeWith(
    {},
    originalOrder!.orderDetails,
    updateDetails,
    orderMergeCustomizer
  );

  return nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) =>
      apiUpdateOrderDetails({
        companyId,
        orderId,
        data: mergedOrderDetails,
      })
    )
  );
};
