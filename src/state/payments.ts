import {
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  merge,
  scan,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import {
  getCustomerContactFormData,
  getCustomerInformationFormData,
  getNewPaymentWorkflowId,
  getPaymentBalances,
  getPaymentConfirmationFormData,
  getPaymentDetailsFormData,
  getPaymentRequest,
  getPaymentsList,
  getPaymentsUploadDocsFormData,
  getPaymentWorkflowStatus,
  removePaymentRequest,
  sendCustomerContactFormData,
  sendCustomerInformationFormData,
  sendPaymentConfirmation,
  sendPaymentDetailsFormData,
  sendPaymentsUploadDocsFormData,
} from 'api/payments';
import { PENDING } from 'state';
import { PaymentListResponse, PaymentRequestCardSummary } from 'ref-data/payments';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { CustomerContactFormValues } from 'screens/CustomerContact/types';
import { PaymentDetailsFormValues } from 'screens/PaymentDetailsEntry/types';
import { UploadPaymentDocsFormValues } from 'screens/UploadPaymentDocsEntry/types';
import { nonEmptySelectedCompanyId$ } from './user';

const [deleteRequestId$, deleteRequestId] = createSignal<string>();
export { deleteRequestId };

const [loadFromDateTime$, setLoadFromDateTime] = createSignal<Date>();
export { setLoadFromDateTime };

const [loadFromIndex$, setLoadFromIndex] = createSignal<number>();
export { setLoadFromIndex };

const [paymentSearchText$, setPaymentSearchText] = createSignal<string>();
export { setPaymentSearchText };

const distinctSearchText$ = paymentSearchText$.pipe(
  distinctUntilChanged(),
  startWith(''),
  shareLatest()
);

distinctSearchText$.pipe(debounceTime(500)).subscribe(() => {
  setLoadFromDateTime(new Date());
});

type RemovePaymentResponse = {
  requestId: string;
  result: boolean;
};
const deleteResponse$ = deleteRequestId$.pipe(
  withLatestFrom(nonEmptySelectedCompanyId$),
  switchMap(([requestId, companyId]) =>
    removePaymentRequest(companyId, requestId).pipe(
      map(
        (result): RemovePaymentResponse => ({
          requestId,
          result,
        })
      ),
      startWith({ requestId, result: PENDING })
    )
  ),
  shareLatest()
);

const deleteRequestAction$ = deleteResponse$.pipe(
  filter(
    (response): response is RemovePaymentResponse => response.result && response.result !== PENDING
  ),
  map(({ requestId }) => ({
    action: 'delete' as const,
    requestId,
  }))
);

const paymentListRequestFromTime$ = loadFromDateTime$.pipe(
  withLatestFrom(distinctSearchText$),
  map(([time, searchText]) => [time, searchText, 0 as number] as const)
);

const paymentListRequestFromIndex$ = loadFromIndex$.pipe(
  withLatestFrom(loadFromDateTime$),
  withLatestFrom(distinctSearchText$),
  map(([[index, time], searchText]) => [time, searchText, index] as const)
);

const requestPaymentsListInput$ = merge(paymentListRequestFromTime$, paymentListRequestFromIndex$);

const paymentsListResponse$ = requestPaymentsListInput$.pipe(
  withLatestFrom(nonEmptySelectedCompanyId$),
  switchMap(([[fromDateTime, searchText, index], companyId]) =>
    getPaymentsList(companyId, fromDateTime, searchText, index).pipe(startWith(PENDING))
  ),
  shareLatest()
);

const loadRequestsAction$ = paymentsListResponse$.pipe(
  filter((response): response is PaymentListResponse => !!response && response !== PENDING),
  withLatestFrom(requestPaymentsListInput$),
  map(([{ requests }, [, , index]]) => ({
    action: 'load' as const,
    requests,
    index,
  }))
);

type PaymentRequestListState = { [id: string]: PaymentRequestCardSummary };
const EMPTY_STATE: PaymentRequestListState = {};
const paymentList$ = merge(loadRequestsAction$, deleteRequestAction$).pipe(
  scan((acc, next) => {
    const result: PaymentRequestListState = { ...acc };
    if (next.action === 'delete') {
      delete result[next.requestId];
    } else if (next.action === 'load') {
      // Remove all existing entries in the state that are after the loaded from index
      // so that the state is updated with the entries from the response
      Object.values(result)
        .filter(({ sortIndex }) => sortIndex >= next.index)
        .forEach(({ requestId }) => {
          delete result[requestId];
        });

      // Insert the entries from the response
      next.requests.forEach((request) => {
        result[request.requestId] = request;
      });
    }

    return result;
  }, EMPTY_STATE),
  shareLatest()
);

export const [useDeleteStatus] = bind(
  (requestId: string | undefined) =>
    deleteResponse$.pipe(
      filter((response) => response.requestId === requestId && requestId !== undefined),
      map(({ result }) => result)
    ),
  undefined
);

export const [usePaymentRequestList] = bind(
  paymentList$.pipe(map((state) => Object.values(state).sort((a, b) => a.sortIndex - b.sortIndex))),
  []
);

export const [useIsPaymentsListLoading] = bind(
  merge(
    paymentsListResponse$.pipe(map((response) => response === PENDING)),
    distinctSearchText$.pipe(map(() => true))
  ),
  true
);

export const [useIsEndOfPaymentsList] = bind(
  paymentsListResponse$.pipe(
    filter((response): response is PaymentListResponse => !!response && response !== PENDING),
    map((response) => response.isEnd)
  ),
  true
);

export const [useUserHasRequests] = bind(
  paymentsListResponse$.pipe(
    filter((response): response is PaymentListResponse => !!response && response !== PENDING),
    map((response) => response.userHasRequests)
  ),
  true
);

export const [usePaymentConfirmationDetails] = bind(
  (paymentId: string) =>
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) =>
        getPaymentConfirmationFormData(companyId, paymentId).pipe(startWith(PENDING))
      )
    ),
  PENDING
);

export const [useBalanceOverview] = bind(
  () =>
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => getPaymentBalances(companyId).pipe(startWith(PENDING)))
    ),
  PENDING
);

export const getNewCreatePaymentId = () =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(switchMap((companyId) => getNewPaymentWorkflowId(companyId)))
  );

export const getCreatePaymentStatus = (paymentId: string) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => getPaymentWorkflowStatus(companyId, paymentId))
    )
  );

export const getPaymentRequestById = (requestId: string) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => getPaymentRequest(companyId, requestId))
    )
  );

export const getCustomerInformationForm = (paymentId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => getCustomerInformationFormData(companyId, paymentId))
  );

export const getCustomerContactForm = (paymentId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => getCustomerContactFormData(companyId, paymentId))
  );

export const sendCustomerInformationForm = (
  paymentId: string,
  data: CustomerInformationFormValues
) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendCustomerInformationFormData(companyId, paymentId, data))
  );

export const sendCustomerContactForm = (paymentId: string, data: CustomerContactFormValues) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendCustomerContactFormData(companyId, paymentId, data))
  );

export const getPaymentDetailsForm = (paymentId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => getPaymentDetailsFormData(companyId, paymentId))
  );

export const sendPaymentDetailsForm = (paymentId: string, data: PaymentDetailsFormValues) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendPaymentDetailsFormData(companyId, paymentId, data))
  );

export const getPaymentsUploadDocsForm = (paymentId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => getPaymentsUploadDocsFormData(companyId, paymentId))
  );

export const sendPaymentsUploadDocsForm = (paymentId: string, data: UploadPaymentDocsFormValues) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendPaymentsUploadDocsFormData(companyId, paymentId, data))
  );

export const confirmPayment = (paymentId: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => sendPaymentConfirmation(companyId, paymentId))
  );
