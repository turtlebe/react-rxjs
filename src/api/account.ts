import { catchError, from, map, Observable } from 'rxjs';
import { handleError, ifOkThenTrue, toResponseData } from '../utils/api';
import { bffFetcher } from './fetch';
import { AccountCompany } from './types';

const t = (str: string) => str;
const phrases = {
  deleteLogoError: t('An error occurred deleting the company logo.'),
};

const fetchAccountDataForCompany = bffFetcher
  .path('/account/{companyIdParam}')
  .method('get')
  .create();

export const getAccountCompanyData = (companyId: string): Observable<AccountCompany | null> =>
  from(fetchAccountDataForCompany({ companyIdParam: companyId })).pipe(map(toResponseData(null)));

const putAccountCompanyLogo = bffFetcher
  .path('/account/{companyIdParam}/logo')
  .method('put')
  .create();

export const updateAccountCompanyLogo = (companyId: string, mimeType: string) =>
  from(putAccountCompanyLogo({ companyIdParam: companyId, mimeType })).pipe(
    map(toResponseData(null))
  );

const deleteAccountCompanyLogo = bffFetcher
  .path('/account/{companyIdParam}/logo')
  .method('delete')
  .create();

export const removeAccountCompanyLogo = (companyId: string) =>
  from(deleteAccountCompanyLogo({ companyIdParam: companyId })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.deleteLogoError, false))
  );
