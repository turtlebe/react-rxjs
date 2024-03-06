import { catchError, from, map, Observable, of } from 'rxjs';
import { merge } from 'lodash';
import { bffFetcher } from '../fetch';
import { CustomerApiPathParams, mapToCustomerApiParams } from '../customer';
import { CustomerCompanyContact } from '../types';
import { dummyFunctionForTranslation as t, handleError, toResponseData } from '../../utils/api';
import { NEW_ID } from '../../state';

const phrases = {
  createCustomerContactError: t('Error creating the new contact'),
  updateCustomerContactError: t('Error updating the contact'),
};

export type CustomerContactsApiPathParams = CustomerApiPathParams & {
  contactId: string;
};

const putCustomerContact = bffFetcher
  .path('/account/{companyIdParam}/customer/{customerIdParam}/contact/{contactIdParam}')
  .method('put')
  .create();

export const updateCustomerContact = (
  params: CustomerContactsApiPathParams,
  contact: CustomerCompanyContact
): Observable<CustomerCompanyContact | undefined> => {
  const requestObject = merge(
    {
      customerIdParam: params.customerId,
      companyIdParam: params.companyId,
      contactIdParam: params.contactId,
    },
    contact
  );

  return from(putCustomerContact(requestObject)).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.updateCustomerContactError, undefined))
  );
};

const createNewPrivateCustomerContact = bffFetcher
  .path('/account/{companyIdParam}/customer/{customerIdParam}/contact')
  .method('post')
  .create();

export const apiCreateNewPrivateCustomerContact = (
  params: CustomerApiPathParams,
  contact: CustomerCompanyContact
): Observable<CustomerCompanyContact | undefined> => {
  // eslint-disable-next-line no-param-reassign
  contact.contactId = undefined; // Override to undefined
  const requestObject = merge(mapToCustomerApiParams(params), contact);

  return from(createNewPrivateCustomerContact(requestObject)).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.createCustomerContactError, undefined))
  );
};

export const apiCreateOrUpdatePrivateCustomerContact = (
  params: CustomerApiPathParams,
  contact: CustomerCompanyContact | undefined
): Observable<CustomerCompanyContact | undefined> => {
  if (!contact) {
    return of(contact);
  }
  if (contact.contactId && contact.contactId !== NEW_ID) {
    return updateCustomerContact({ ...params, contactId: contact.contactId }, contact);
  }

  return apiCreateNewPrivateCustomerContact(params, contact);
};
