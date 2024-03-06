import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  merge,
  Observable,
  retry,
  scan,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { fromFetch } from 'rxjs/internal/observable/dom/fetch';
import {
  getOrder,
  getOrderCustomerContactFormData,
  getOrderCustomerInformationFormData,
  getOrdersList,
  removeOrder,
  getOrderDocument,
  sendOrderDocument,
  sendNewCustomerInformationFormData,
  sendOrderCustomerContactFormData,
  sendOrderCustomerInformationFormData,
  shareOrderViaEmail,
  createOrderDocument,
  sendCompleteUploadById,
  sendConfirmOrderPaymentReceived,
  removeDocumentById,
} from 'api/orders';
import { DocumentTypeForAutogeneration, DocumentTypeForSend } from 'api/types';
import { PENDING } from 'state';
import { OrderListResponse, OrderCardSummary } from 'ref-data/orders';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { OrderCustomerContactFormValues } from 'screens/OrderCustomerContact/types';
import { dummyFunctionForTranslation as t, handleError } from '../utils/api';
import { nonEmptySelectedCompanyId$ } from './user';

const phrases = {
  fileNotReady: t('File not ready'),
};

const [deleteOrderId$, deleteOrderId] = createSignal<string>();
export { deleteOrderId };

const [loadFromDateTime$, setLoadFromDateTime] = createSignal<Date>();
export { setLoadFromDateTime };

const [loadFromIndex$, setLoadFromIndex] = createSignal<number>();
export { setLoadFromIndex };

const [orderSearchText$, setOrderSearchText] = createSignal<string>();
export { setOrderSearchText };

export const getOrderCustomerInformationForm = (orderId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => getOrderCustomerInformationFormData(companyId, orderId))
  );

export const getOrderCustomerContactForm = (orderId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => getOrderCustomerContactFormData(companyId, orderId))
  );

export const sendNewOrderCustomerInformationForm = (data: CustomerInformationFormValues) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendNewCustomerInformationFormData(companyId, data))
  );

export const sendOrderCustomerInformationForm = (
  orderId: string,
  data: CustomerInformationFormValues
) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendOrderCustomerInformationFormData(orderId, data, companyId))
  );

export const sendOrderCustomerContactForm = (
  customerId: string,
  data: OrderCustomerContactFormValues,
  orderId: string
) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => sendOrderCustomerContactFormData(companyId, orderId, data))
    )
  );

const distinctSearchText$ = orderSearchText$.pipe(
  distinctUntilChanged(),
  startWith(''),
  shareLatest()
);

distinctSearchText$.pipe(debounceTime(500)).subscribe(() => {
  setLoadFromDateTime(new Date());
});

type RemoveOrderResponse = {
  orderId: string;
  result: boolean;
};
const deleteResponse$ = deleteOrderId$.pipe(
  withLatestFrom(nonEmptySelectedCompanyId$),
  switchMap(([orderId, companyId]) =>
    removeOrder(companyId, orderId).pipe(
      map(
        (result): RemoveOrderResponse => ({
          orderId,
          result,
        })
      ),
      startWith({ orderId, result: PENDING })
    )
  ),
  shareLatest()
);

const deleteOrderAction$ = deleteResponse$.pipe(
  filter(
    (response): response is RemoveOrderResponse => response.result && response.result !== PENDING
  ),
  map(({ orderId }) => ({
    action: 'delete' as const,
    orderId,
  }))
);

const orderListRequestFromTime$ = loadFromDateTime$.pipe(
  withLatestFrom(distinctSearchText$),
  map(([time, searchText]) => [time, searchText, 0 as number] as const)
);

const orderListRequestFromIndex$ = loadFromIndex$.pipe(
  withLatestFrom(loadFromDateTime$),
  withLatestFrom(distinctSearchText$),
  map(([[index, time], searchText]) => [time, searchText, index] as const)
);

const requestOrdersListInput$ = merge(orderListRequestFromTime$, orderListRequestFromIndex$);

const ordersListResponse$ = requestOrdersListInput$.pipe(
  withLatestFrom(nonEmptySelectedCompanyId$),
  switchMap(([[fromDateTime, searchText, index], companyId]) =>
    getOrdersList(companyId, fromDateTime, searchText, index).pipe(startWith(PENDING))
  ),
  shareLatest()
);

const loadOrdersAction$ = ordersListResponse$.pipe(
  filter((response): response is OrderListResponse => !!response && response !== PENDING),
  withLatestFrom(requestOrdersListInput$),
  map(([{ orders }, [, , index]]) => ({
    action: 'load' as const,
    orders,
    index,
  }))
);

type OrderListState = { [id: string]: OrderCardSummary };
const EMPTY_STATE: OrderListState = {};
const orderList$ = merge(loadOrdersAction$, deleteOrderAction$).pipe(
  scan((acc, next) => {
    const result: OrderListState = { ...acc };
    if (next.action === 'delete') {
      delete result[next.orderId];
    } else if (next.action === 'load') {
      // Remove all existing entries in the state that are after the loaded from index
      // so that the state is updated with the entries from the response
      Object.values(result)
        .filter(({ sortIndex }) => sortIndex! >= next.index)
        .forEach(({ orderId }) => {
          delete result[orderId!];
        });

      // Insert the entries from the response
      next.orders?.forEach((order) => {
        result[order.orderId!] = order;
      });
    }

    return result;
  }, EMPTY_STATE),
  shareLatest()
);

export const [useDeleteStatus] = bind(
  (orderId: string | undefined) =>
    deleteResponse$.pipe(
      filter((response) => response.orderId === orderId && orderId !== undefined),
      map(({ result }) => result)
    ),
  undefined
);

export const [useOrderList] = bind(
  orderList$.pipe(map((state) => Object.values(state).sort((a, b) => a.sortIndex! - b.sortIndex!))),
  []
);

export const [useIsOrdersListLoading] = bind(
  merge(
    ordersListResponse$.pipe(map((response) => response === PENDING)),
    distinctSearchText$.pipe(map(() => true))
  ),
  true
);

export const [useIsEndOfOrdersList] = bind(
  ordersListResponse$.pipe(
    filter((response): response is OrderListResponse => !!response && response !== PENDING),
    map((response) => response.isEnd)
  ),
  true
);

export const [useUserHasOrders] = bind(
  ordersListResponse$.pipe(
    filter((response): response is OrderListResponse => !!response && response !== PENDING),
    map((response) => response.userHasOrders)
  ),
  true
);

export const getOrderById = (orderId: string) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(switchMap((companyId) => getOrder(companyId, orderId)))
  );

export const getInvoicePagePreloadData = (orderId: string) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap(async (companyId) => {
        const order = await firstValueFrom(getOrder(companyId, orderId));
        const documentId = order?.documentDetails?.filter(
          (document) => document.documentType === 'ProofOfDelivery'
        )[0].documentId;
        const orderDocument = await firstValueFrom(
          getOrderDocument(companyId, orderId, documentId!)
        );
        return {
          contactEmail:
            order?.orderDetails?.customerInformation.contacts?.dispositionContact?.contactDetails
              ?.email,
          downloadLink: orderDocument?.url,
        };
      })
    )
  );

export const shareOrderData = (orderId: string, recipient: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => shareOrderViaEmail(companyId, orderId, recipient))
  );

const waitForValidUrl = (
  url: string,
  delayMillis: number,
  retryCount: number
): Observable<string> =>
  fromFetch(url).pipe(
    map((response) => {
      if (response.ok) {
        return url;
      }
      throw new Error(phrases.fileNotReady);
    }),
    retry({
      count: retryCount,
      delay: delayMillis,
    })
  );

export const getAndWaitForDocumentUrlById = (
  orderId: string,
  documentId: string,
  delayMillis = 1000,
  retryCount = 30
) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$
      .pipe(
        switchMap((companyId) => getOrderDocument(companyId, orderId, documentId)),
        filter((document) => !!document?.url),
        map((document) => document!.url!)
      )
      .pipe(switchMap((url) => waitForValidUrl(url, delayMillis, retryCount)))
  );

export const sendDocumentByOrderId = (
  orderId: string,
  documentType: DocumentTypeForSend,
  errorMessageKey: string
) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => sendOrderDocument(companyId, orderId, documentType)),
      catchError(handleError(errorMessageKey, undefined))
    )
  );

export const createOrderDocumentAndGetId = (
  orderId: string,
  documentType: DocumentTypeForAutogeneration,
  errorMessageKey: string,
  invoiceNumber?: string
) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) =>
        createOrderDocument(companyId, orderId, documentType, errorMessageKey, invoiceNumber)
      )
    )
  );

export const completeUploadById = (orderId: string, documentId: string, creditNoteDate?: Date) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) =>
        sendCompleteUploadById(companyId, orderId, documentId, creditNoteDate)
      )
    )
  );

export const deleteOrderDocumentById = (orderId: string, documentId: string) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => removeDocumentById(companyId, orderId, documentId))
    )
  );

export const confirmOrderPaymentReceived = (orderId: string, paymentReceivedOn: string) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) =>
        sendConfirmOrderPaymentReceived(companyId, orderId, paymentReceivedOn)
      )
    )
  );
