import { catchError, from, map, Observable } from 'rxjs';
import { handleError, ifOkThenTrue, toResponseData } from 'utils/api';
import { unFuckedIsoDate } from 'utils/date';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { PaymentDetailsFormValues } from 'screens/PaymentDetailsEntry/types';
import { components, operations } from '__generated__/truckos-api';
import { UploadPaymentDocsFormValues } from 'screens/UploadPaymentDocsEntry/types';
import { NEW_ID } from 'state';
import { PaymentListResponse } from 'ref-data/payments';
import { CustomerContactFormValues } from 'screens/CustomerContact/types';
import { fetcher } from './fetch';
import { NEW_WORKFLOW, PaymentBalances, PaymentRequestDetail, WorkflowStatus } from './types';

// dummy t function for translation extraction
const t = (str: string) => str;
const phrases = {
  noResponse: t('No response received'),
  getCustomerInformationError: t('An error occurred initializing the customer information form'),
  sendCustomerInformationError: t('An error occurred submitting the customer information form'),
  getCustomerContactError: t('An error occurred initializing the customer contact form'),
  sendCustomerContactError: t('An error occurred submitting the customer contact form'),
  getPaymentDetailsError: t('An error occurred initializing the payment details form'),
  sendPaymentDetailsError: t('An error occurred submitting the payment details form'),
  getUploadDocsError: t('An error occurred initializing the upload documents form'),
  sendUploadDocsError: t('An error occurred submitting the upload documents form'),
  getConfirmationError: t('An error occurred fetching the payment confirmation details'),
  sendConfirmationError: t('An error occurred submitting the payment confirmation'),
  getPaymentBalancesError: t('An error occurred fetching payment balances.'),
  getPaymentsListError: t('An error occurred fetching the payment requests.'),
  deletePaymentRequestError: t('An error occurred deleting the payment request.'),
};

const fetchNewPaymentWorkflowId = fetcher
  .path('/company/{companyId}/create-payment/new')
  .method('get')
  .create();
export const getNewPaymentWorkflowId = (companyId: string): Observable<string | undefined> =>
  from(fetchNewPaymentWorkflowId({ companyId })).pipe(
    map(toResponseData(undefined)),
    map((response) => {
      if (response) {
        return response.id;
      }

      throw new Error(phrases.noResponse);
    })
  );

const fetchPaymentWorkflowStatus = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}')
  .method('get')
  .create();
export const getPaymentWorkflowStatus = (
  companyId: string,
  paymentId: string
): Observable<WorkflowStatus> =>
  from(fetchPaymentWorkflowStatus({ companyId, paymentId })).pipe(
    map(toResponseData(NEW_WORKFLOW))
  );

const fetchCustomerInformationFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/customer-information')
  .method('get')
  .create();
export const getCustomerInformationFormData = (
  companyId: string,
  paymentId: string
): Observable<Partial<CustomerInformationFormValues> | undefined> =>
  from(fetchCustomerInformationFormData({ companyId, paymentId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getCustomerInformationError, undefined))
  );

const convertCustomerInformationFormData = (
  data: CustomerInformationFormValues
): components['schemas']['PaymentsCustomerInformation'] => ({
  ...data,
  companyId: data.companyId === NEW_ID ? '' : data.companyId,
});

const postCustomerInformationFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/customer-information')
  .method('post')
  .create();
export const sendCustomerInformationFormData = (
  companyId: string,
  paymentId: string,
  data: CustomerInformationFormValues
) =>
  from(
    postCustomerInformationFormData({
      companyId,
      paymentId,
      form: convertCustomerInformationFormData(data),
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendCustomerInformationError, false)));

const fetchCustomerContactFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/customer-contact')
  .method('get')
  .create();
export const getCustomerContactFormData = (
  companyId: string,
  paymentId: string
): Observable<Partial<CustomerContactFormValues> | undefined> =>
  from(fetchCustomerContactFormData({ companyId, paymentId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getCustomerInformationError, undefined))
  );

const convertCustomerContactFormData = (
  data: CustomerContactFormValues
): components['schemas']['PaymentsCustomerContact'] => ({
  ...data,
  contactId: data.contactId === NEW_ID ? '' : data.contactId,
});

const postCustomerContactFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/customer-contact')
  .method('post')
  .create();
export const sendCustomerContactFormData = (
  companyId: string,
  paymentId: string,
  data: CustomerContactFormValues
) =>
  from(
    postCustomerContactFormData({
      companyId,
      paymentId,
      form: convertCustomerContactFormData(data),
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendCustomerInformationError, false)));

const convertPaymentDetailsApiData = (
  data: components['schemas']['PaymentsPaymentDetails']
): PaymentDetailsFormValues => ({
  ...data,
  country: data.applicableLaw,
  deliveryDate: new Date(data.deliveryDate),
  invoiceOrCreditNoteDate: new Date(data.invoiceOrCreditNoteDate),
});

const fetchPaymentDetailsFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/payment-details')
  .method('get')
  .create();
export const getPaymentDetailsFormData = (
  companyId: string,
  paymentId: string
): Observable<Partial<PaymentDetailsFormValues> | undefined> =>
  from(fetchPaymentDetailsFormData({ companyId, paymentId })).pipe(
    map(toResponseData(undefined)),
    map((data) => (data ? convertPaymentDetailsApiData(data) : data)),
    catchError(handleError(phrases.getPaymentDetailsError, undefined))
  );

const convertPaymentDetailsFormData = (
  data: PaymentDetailsFormValues
): components['schemas']['PaymentsPaymentDetails'] => ({
  ...data,
  applicableLaw: data.country,
  deliveryDate: unFuckedIsoDate(data.deliveryDate),
  invoiceOrCreditNoteDate: unFuckedIsoDate(data.invoiceOrCreditNoteDate),
  paymentTerm: data.paymentTerm || 0,
  amount: data.amount || 0,
});

const postPaymentDetailsFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/payment-details')
  .method('post')
  .create();
export const sendPaymentDetailsFormData = (
  companyId: string,
  paymentId: string,
  data: PaymentDetailsFormValues
) =>
  from(
    postPaymentDetailsFormData({ companyId, paymentId, form: convertPaymentDetailsFormData(data) })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendPaymentDetailsError, false)));

const fetchPaymentsUploadDocsFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/upload-documents')
  .method('get')
  .create();
export const getPaymentsUploadDocsFormData = (
  companyId: string,
  paymentId: string
): Observable<Partial<UploadPaymentDocsFormValues> | undefined> =>
  from(fetchPaymentsUploadDocsFormData({ companyId, paymentId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getUploadDocsError, undefined))
  );

const convertUploadPaymentDocsFormData = (
  data: UploadPaymentDocsFormValues
): components['schemas']['PaymentsUploadDocuments'] =>
  data.clearingSystem === 'invoice'
    ? {
        confirmInvoiceHasIban: data.confirmInvoiceHasIban,
        invoiceFilename: data.invoiceFilename,
        invoiceUploadId: data.invoiceUploadId,
        proofOfDeliveryFilename: data.proofOfDeliveryFilename,
        proofOfDeliveryUploadId: data.proofOfDeliveryUploadId,
      }
    : {
        creditNoteFilename: data.creditNoteFilename,
        creditNoteUploadId: data.creditNoteUploadId,
        proofOfDeliveryFilename: data.proofOfDeliveryFilename,
        proofOfDeliveryUploadId: data.proofOfDeliveryUploadId,
      };

const postPaymentsUploadDocsFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/upload-documents')
  .method('post')
  .create();
export const sendPaymentsUploadDocsFormData = (
  companyId: string,
  paymentId: string,
  data: UploadPaymentDocsFormValues
) =>
  from(
    postPaymentsUploadDocsFormData({
      companyId,
      paymentId,
      form: convertUploadPaymentDocsFormData(data),
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendUploadDocsError, false)));

const fetchPaymentConfirmationFormData = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/confirmation')
  .method('get')
  .create();
export const getPaymentConfirmationFormData = (
  companyId: string,
  paymentId: string
): Observable<PaymentRequestDetail | undefined> =>
  from(fetchPaymentConfirmationFormData({ companyId, paymentId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getConfirmationError, undefined))
  );

const postPaymentConfirmation = fetcher
  .path('/company/{companyId}/create-payment/{paymentId}/confirmation')
  .method('post')
  .create();
export const sendPaymentConfirmation = (companyId: string, paymentId: string) =>
  from(postPaymentConfirmation({ companyId, paymentId, confirm: true })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.sendConfirmationError, false))
  );

const fetchPaymentBalances = fetcher
  .path('/company/{companyId}/payments/balances')
  .method('get')
  .create();
export const getPaymentBalances = (companyId: string): Observable<PaymentBalances | undefined> =>
  from(fetchPaymentBalances({ companyId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getPaymentBalancesError, undefined))
  );

type ApiPaymentListResponse =
  operations['getPaymentsList']['responses']['200']['content']['application/json'];
const convertPaymentsListApiData = (
  data: ApiPaymentListResponse | undefined
): PaymentListResponse | undefined =>
  data
    ? {
        ...data,
        requests: data.requests.map(({ deliveryDate, ...rest }) => ({
          ...rest,
          deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
        })),
      }
    : undefined;

const fetchPaymentsList = fetcher.path('/company/{companyId}/payments/list').method('get').create();
export const getPaymentsList = (
  companyId: string,
  fromDateTime: Date,
  searchText: string,
  index: number
): Observable<PaymentListResponse | undefined> =>
  from(
    fetchPaymentsList({
      companyId,
      count: 10,
      fromTime: fromDateTime.getTime(),
      search: searchText,
      index,
    })
  ).pipe(
    map(toResponseData(undefined)),
    map(convertPaymentsListApiData),
    catchError(handleError(phrases.getPaymentsListError, undefined))
  );

const fetchPaymentRequest = fetcher
  .path('/company/{companyId}/payment/{requestId}')
  .method('get')
  .create();
export const getPaymentRequest = (
  companyId: string,
  requestId: string
): Observable<PaymentRequestDetail | undefined> =>
  from(fetchPaymentRequest({ companyId, requestId })).pipe(map(toResponseData(undefined)));

const deletePaymentRequest = fetcher
  .path('/company/{companyId}/payment/{requestId}')
  .method('delete')
  .create();
export const removePaymentRequest = (companyId: string, requestId: string) =>
  from(deletePaymentRequest({ companyId, requestId })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.deletePaymentRequestError, false))
  );
