import { catchError, from, map, Observable } from 'rxjs';
import { handleError, toResponseData } from 'utils/api';
import { bffFetcher } from './fetch';
import { CustomerCompany } from './types';

const t = (str: string) => str;
const phrases = {
  getCompanyDetailsError: t('An error occurred fetching company details'),
};

export type CustomerApiPathParams = {
  companyId: string;
  customerId: string;
};

export const mapToCustomerApiParams = (params: CustomerApiPathParams) => ({
  companyIdParam: params.companyId,
  customerIdParam: params.customerId,
});

const fetchCustomerCompanyDetails = bffFetcher
  .path('/account/{companyIdParam}/customer/{customerIdParam}')
  .method('get')
  .create();
export const getCustomerCompany = (
  params: CustomerApiPathParams
): Observable<CustomerCompany | undefined> =>
  from(fetchCustomerCompanyDetails(mapToCustomerApiParams(params))).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getCompanyDetailsError, undefined))
  );
