import { catchError, from, map, Observable } from 'rxjs';
import { merge } from 'lodash';
import { handleError, ifOkThenTrue, toResponseData } from '../utils/api';
import { bffFetcher } from './fetch';
import { CustomerCompanyContact, Order, OrderDetails } from './types';

// dummy t function for translation extraction
const t = (str: string) => str;
const phrases = {
  getOrderError: t('Error Retrieving the Order'),
  putOrderError: t('Error updating the order'),
  createOrderError: t('Error creating the order'),
};

/**
 * POST (a.k.a. CREATE)
 */

export type CreateOrderRequest = {
  contacts?: {
    bookkeepingContact?: CustomerCompanyContact;
    dispositionContact?: CustomerCompanyContact;
  };
  customerId: string;
};

const createNewOrder = bffFetcher.path('/account/{companyIdParam}/order').method('post').create();

export const apiCreateOrder = (params: { companyId: string }, request: CreateOrderRequest) => {
  const requestObject = merge(
    {
      companyIdParam: params.companyId,
    },
    request
  );

  return from(createNewOrder(requestObject)).pipe(
    map(toResponseData(undefined)),
    map((respData) => (respData ? respData.orderId : undefined)),
    catchError(handleError(phrases.createOrderError, undefined))
  );
};

/**
 * GET
 */

const fetchOrderData = bffFetcher
  .path('/account/{companyIdParam}/order/{orderIdParam}')
  .method('get')
  .create();
export const apiGetOrder = <TMapTo>(
  params: {
    companyId: string;
    orderId: string;
  },
  mapper: (value: Order | undefined) => TMapTo | undefined,
  onErrorPhrase = phrases.getOrderError
): Observable<TMapTo | undefined> => {
  const { companyId, orderId } = params;
  return from(fetchOrderData({ companyIdParam: companyId, orderIdParam: orderId })).pipe(
    map(toResponseData(undefined)),
    map(mapper),
    catchError(handleError(onErrorPhrase, undefined))
  );
};

/**
 * PUT
 */

const putOrderDetails = bffFetcher
  .path('/account/{companyIdParam}/order/{orderIdParam}')
  .method('put')
  .create();

export const apiUpdateOrderDetails = (
  params: {
    companyId: string;
    data: OrderDetails;
    orderId: string;
  },
  onErrorPhrase = phrases.putOrderError
) => {
  const { companyId, data, orderId } = params;
  const requestObject = merge(
    {
      companyIdParam: companyId,
      orderIdParam: orderId,
    },
    data
  );

  return from(putOrderDetails(requestObject)).pipe(
    map(ifOkThenTrue),
    catchError(handleError(onErrorPhrase, false))
  );
};
