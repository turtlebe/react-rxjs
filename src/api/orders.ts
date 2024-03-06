import { catchError, from, map, Observable } from 'rxjs';
import posthog from 'posthog-js';
import { handleError, ifOkThenTrue, toResponseData } from 'utils/api';
import { unFuckedIsoDate } from 'utils/date';
import {
  NEW_WORKFLOW,
  WorkflowStatus,
  Order,
  DocumentTypeForSend,
  DocumentTypeForAutogeneration,
  DownloadFileLink,
  UploadableDocumentTypes,
  UploadFileLink,
} from 'api/types';
import {
  components as bffComponents,
  operations as bffOperations,
} from '__generated__/truckos-api-bff';
import { OrderListResponse } from 'ref-data/orders';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { NEW_ID } from 'state';
import { OrderCustomerContactFormValues } from 'screens/OrderCustomerContact/types';
import { fetcher, bffFetcher } from './fetch';

// dummy t function for translation extraction
const t = (str: string) => str;
const phrases = {
  noResponse: t('No response received'),
  getOrdersListError: t('An error occurred fetching the orders.'),
  deleteOrderError: t('An error occurred deleting the order.'),
  getCustomerInformationError: t('An error occurred initializing the customer information form'),
  sendCustomerInformationError: t('An error occurred submitting the customer information form'),
  getCustomerContactError: t('An error occurred initializing the customer contact form'),
  sendCustomerContactError: t('An error occurred submitting the customer contact form'),
  getOrderDetailsError: t('An error occurred initializing the order details form'),
  sendOrderDetailsError: t('An error occurred submitting the order details form'),
  shareOrderError: t('An error occurred sharing the order'),
  completeUploadError: t('An error occurred completing the upload'),
  getUploadLinkError: t('An error occurred registering a new file upload'),
  confirmPaymentReceivedError: t('An error occurred confirming the payment'),
};

type ApiOrderListResponse =
  bffOperations['getOrdersList']['responses']['200']['content']['application/json'];
const convertOrdersListApiData = (
  data: ApiOrderListResponse | undefined
): OrderListResponse | undefined =>
  data
    ? {
        ...data,
        orders: data.orders?.map(({ deliveryDate, ...rest }) => ({
          ...rest,
          deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
        })),
      }
    : undefined;

const fetchOrdersList = bffFetcher.path('/account/{companyIdParam}/order').method('get').create();
export const getOrdersList = (
  companyId: string,
  fromDateTime: Date,
  searchText: string,
  index: number
): Observable<OrderListResponse | undefined> =>
  from(
    fetchOrdersList({
      companyIdParam: companyId,
      size: 10,
      orderAsOfTime: unFuckedIsoDate(fromDateTime),
      search: searchText,
      offset: index,
    })
  ).pipe(
    map(toResponseData(undefined)),
    map(convertOrdersListApiData),
    catchError(handleError(phrases.getOrdersListError, undefined))
  );

const fetchOrderWorkflowStatus = fetcher
  .path('/company/{companyId}/create-order/{orderId}')
  .method('get')
  .create();
export const getOrderWorkflowStatus = (
  companyId: string,
  orderId: string
): Observable<WorkflowStatus> =>
  from(fetchOrderWorkflowStatus({ companyId, orderId })).pipe(map(toResponseData(NEW_WORKFLOW)));

const convertCustomerInformationFormData = (
  data: CustomerInformationFormValues,
  companyId?: string
): bffComponents['schemas']['CustomerCompany'] => ({
  companyId: companyId || data.companyId,
  companyName: data.companyName,
  details: {
    vatId: data.vatId,
    companyType: 'GermanCompanyDetails',
    address: {
      addressAddOn: data.addressAddon,
      city: data.city,
      country: data.country,
      postcode: data.postcode,
      streetAndNumber: data.streetAndNumber,
    },
  },
});

const createNewCustomer = bffFetcher.path('/account/{companyId}/customer').method('post').create();
export const sendNewCustomerInformationFormData = (
  companyId: string,
  data: CustomerInformationFormValues
) =>
  from(
    createNewCustomer({ companyId, form: convertCustomerInformationFormData(data, companyId) })
  ).pipe(
    map(toResponseData(undefined)),
    map((response) => {
      if (response) {
        posthog.capture('New customer created', {
          customerId: response.customerCompany?.companyId,
          customerName: response.customerCompany?.companyName,
          customerCountry: response.customerCompany?.details.address?.country,
          customerCity: response.customerCompany?.details.address?.city,
        });
        return response.customerCompany?.companyId;
      }

      throw new Error(phrases.noResponse);
    })
  );

const getPreviousCustomer = bffFetcher.path('/account/{companyId}/customer').method('get').create();
export const getPreviousCustomerList = (companyId: string) =>
  from(getPreviousCustomer({ companyId })).pipe(map(toResponseData(undefined)));

const getGlobalCompanies = bffFetcher.path('/account/company/search').method('get').create();
export const getGlobalCompanyList = (search: string) =>
  from(getGlobalCompanies({ query: search })).pipe(map(toResponseData(undefined)));

const convertOrderCustomerContactApiData = (
  data: bffComponents['schemas']['Order']
): OrderCustomerContactFormValues => {
  const contacts = data.orderDetails?.customerInformation.contacts;
  return {
    bookKeepingContactId: contacts?.bookkeepingContact?.contactId || '',
    bookKeepingContactName: contacts?.bookkeepingContact?.contactName || '',
    bookKeepingEmail: contacts?.bookkeepingContact?.contactDetails?.email || '',
    bookKeepingPhoneNumber: contacts?.bookkeepingContact?.contactDetails?.phoneNumber || '',
    dispositionContactId: contacts?.dispositionContact?.contactId || '',
    dispositionContactName: contacts?.dispositionContact?.contactName || '',
    dispositionEmail: contacts?.dispositionContact?.contactDetails?.email || '',
    dispositionPhoneNumber: contacts?.dispositionContact?.contactDetails?.phoneNumber || '',
  };
};

const convertOrderCustomerInformationApiData = (
  data: bffComponents['schemas']['Order']
): CustomerInformationFormValues => {
  const customer = data.orderDetails?.customerInformation.customerCompany;
  return {
    companyId: customer?.companyId || '',
    companyName: customer?.companyName || '',
    addressAddon: customer?.details.address?.addressAddOn || '',
    city: customer?.details.address?.city || '',
    country: customer?.details.address?.country || '',
    streetAndNumber: customer?.details.address?.streetAndNumber || '',
    postcode: customer?.details.address?.postcode || '',
    vatId: customer?.details.vatId || '',
    commercialRegisterNumber: customer?.details.commercialRegisterNumber || '',
    legalForm: customer?.details.legalForm || '',
    registrationAuthority: customer?.details.registrationAuthority || '',
  };
};

const fetchOrderData = bffFetcher
  .path('/account/{companyIdParam}/order/{orderIdParam}')
  .method('get')
  .create();

const putOrderDetails = bffFetcher
  .path('/account/{companyIdParam}/order/{orderIdParam}')
  .method('put')
  .create();

const mapParams = (params: {
  companyId: string;
  orderId: string;
}): { companyIdParam: string; orderIdParam: string } => ({
  companyIdParam: params.companyId,
  orderIdParam: params.orderId,
});

export const getOrderCustomerInformationFormData = (
  companyId: string,
  orderId: string
): Observable<Partial<CustomerInformationFormValues> | undefined> =>
  from(fetchOrderData(mapParams({ companyId, orderId }))).pipe(
    map(toResponseData(undefined)),
    map((data) => (data ? convertOrderCustomerInformationApiData(data) : data)),
    catchError(handleError(phrases.getCustomerInformationError, undefined))
  );

export const getOrderCustomerContactFormData = (
  companyId: string,
  orderId: string
): Observable<OrderCustomerContactFormValues | undefined> =>
  from(fetchOrderData(mapParams({ companyId, orderId }))).pipe(
    map(toResponseData(undefined)),
    map((data) => (data ? convertOrderCustomerContactApiData(data) : data)),
    catchError(handleError(phrases.getCustomerContactError, undefined))
  );

const convertBookKeepingContactFormData = (
  data: OrderCustomerContactFormValues
): bffComponents['schemas']['CustomerCompanyContact'] => ({
  contactId: data.bookKeepingContactId === NEW_ID ? '' : data.bookKeepingContactId,
  contactName: data.bookKeepingContactName,
  contactDetails: {
    email: data.bookKeepingEmail,
    phoneNumber: data.bookKeepingPhoneNumber,
  },
  useFor: ['bookkeeping'],
});

const convertDispositionContactFormData = (
  data: OrderCustomerContactFormValues
): bffComponents['schemas']['CustomerCompanyContact'] => ({
  contactId: data.dispositionContactId === NEW_ID ? '' : data.dispositionContactId,
  contactName: data.dispositionContactName,
  contactDetails: {
    email: data.dispositionEmail,
    phoneNumber: data.dispositionPhoneNumber,
  },
  useFor: ['disposition'],
});

export const sendOrderCustomerInformationFormData = (
  orderId: string,
  data: CustomerInformationFormValues,
  companyId?: string
) =>
  from(
    putOrderDetails({
      orderIdParam: orderId,
      companyIdParam: companyId || data.companyId,
      customerInformation: {
        customerCompany: convertCustomerInformationFormData(data, companyId),
      },
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendCustomerInformationError, false)));

export const sendOrderCustomerContactFormData = (
  orderId: string,
  companyId: string,
  data: OrderCustomerContactFormValues
) =>
  from(
    putOrderDetails({
      companyIdParam: companyId,
      orderIdParam: orderId,
      customerInformation: {
        contacts: {
          dispositionContact: convertBookKeepingContactFormData(data),
          bookkeepingContact: convertDispositionContactFormData(data),
        },
      },
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendCustomerContactError, false)));

export const getOrder = (companyId: string, orderId: string): Observable<Order | undefined> =>
  from(fetchOrderData(mapParams({ companyId, orderId }))).pipe(map(toResponseData(undefined)));

const deleteOrder = bffFetcher
  .path('/account/{companyIdParam}/order/{orderIdParam}')
  .method('delete')
  .create();
export const removeOrder = (companyId: string, orderId: string) =>
  from(deleteOrder(mapParams({ companyId, orderId }))).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.deleteOrderError, false))
  );

const shareOrderData = bffFetcher
  .path('/account/{companyId}/order/{orderId}/share')
  .method('post')
  .create();
export const shareOrderViaEmail = (companyId: string, orderId: string, recipient: string) =>
  from(shareOrderData({ companyId, orderId, recipient, channel: 'EMAIL' })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.shareOrderError, false))
  );

const generateOrderDocument = bffFetcher
  .path('/account/{companyId}/order/{orderId}/document/generate')
  .method('post')
  .create();

export const createOrderDocument = (
  companyId: string,
  orderId: string,
  documentType: DocumentTypeForAutogeneration,
  errorMessageKey: string,
  invoiceNumber?: string
) =>
  from(generateOrderDocument({ companyId, orderId, documentType, invoiceNumber })).pipe(
    map(toResponseData(undefined)),
    map((respData) => (respData ? respData.documentId : undefined)),
    catchError(handleError(errorMessageKey, undefined))
  );

const fetchOrderDocument = bffFetcher
  .path('/account/{companyId}/order/{orderId}/document/{documentId}')
  .method('get')
  .create();
export const getOrderDocument = (
  companyId: string,
  orderId: string,
  documentId: string
): Observable<DownloadFileLink | undefined> =>
  from(fetchOrderDocument({ companyId, orderId, documentId })).pipe(map(toResponseData(undefined)));

const sendOrderDocumentByEmail = bffFetcher
  .path('/account/{companyId}/order/{orderId}/document/send')
  .method('post')
  .create();
export const sendOrderDocument = (
  companyId: string,
  orderId: string,
  documentType: DocumentTypeForSend
) =>
  from(sendOrderDocumentByEmail({ companyId, orderId, documentType })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.shareOrderError, false))
  );

const uploadOrderDocument = bffFetcher
  .path('/account/{companyId}/order/{orderId}/document/upload')
  .method('post')
  .create();
export const getOrderDocumentUploadLink = (
  orderId: string,
  companyId: string,
  documentType: UploadableDocumentTypes,
  fileName: string,
  contentType: string
): Observable<UploadFileLink | undefined> =>
  from(uploadOrderDocument({ orderId, companyId, documentType, fileName, contentType })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getUploadLinkError, undefined))
  );

const putCompleteUploadById = bffFetcher
  .path('/account/{companyId}/order/{orderId}/document/{documentId}')
  .method('put')
  .create();
export const sendCompleteUploadById = (
  companyId: string,
  orderId: string,
  documentId: string,
  creditNoteDate?: Date
) =>
  from(
    putCompleteUploadById({
      companyId,
      documentId,
      orderId,
      creditNoteDate: unFuckedIsoDate(creditNoteDate),
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.completeUploadError, false)));

const deleteDocumentById = bffFetcher
  .path('/account/{companyId}/order/{orderId}/document/{documentId}')
  .method('delete')
  .create();
export const removeDocumentById = (companyId: string, orderId: string, documentId: string) =>
  from(
    deleteDocumentById({
      companyId,
      documentId,
      orderId,
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.completeUploadError, false)));

const postPaymentReceived = bffFetcher
  .path('/account/{companyId}/order/{orderId}/payment')
  .method('post')
  .create();

export const sendConfirmOrderPaymentReceived = (
  companyId: string,
  orderId: string,
  paymentReceivedOn: string
) =>
  from(postPaymentReceived({ companyId, orderId, paymentReceivedOn })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.confirmPaymentReceivedError, undefined))
  );
