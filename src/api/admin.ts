import { catchError, from, map, Observable } from 'rxjs';
import { handleError, ifOkThenTrue, toResponseData } from 'utils/api';
import { components } from '__generated__/truckos-api';
import { AttachedCompaniesResponse, RegisteredCompaniesResponse } from '../ref-data/admin';
import { fetcher } from './fetch';

const t = (str: string) => str;
const phrases = {
  sendAttachCompanyError: t('An error occurred attaching the company'),
  removeAttachCompanyError: t('An error occurred removing the attached company'),
};

const fetchRegisteredCompanies = fetcher.path('/admin/companies').method('get').create();
export const getRegisteredCompanies = (): Observable<RegisteredCompaniesResponse | null> =>
  from(fetchRegisteredCompanies({})).pipe(map(toResponseData(null)));

const fetchAttachedCompanies = fetcher.path('/admin/attached-companies').method('get').create();
export const getAttachedCompanies = (): Observable<AttachedCompaniesResponse | null> =>
  from(fetchAttachedCompanies({})).pipe(map(toResponseData(null)));

const postAttachCompany = fetcher
  .path('/admin/attached-company/{companyId}')
  .method('post')
  .create();
export const attachCompany = (
  companyId: string,
  role: components['schemas']['AttachedCompany']['role'],
  attachedUntil: string
) =>
  from(postAttachCompany({ companyId, role, attachedUntil })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.sendAttachCompanyError, false))
  );

const deleteAttachedCompany = fetcher
  .path('/admin/attached-company/{companyId}')
  .method('delete')
  .create();
export const removeAttachedCompany = (companyId: string) =>
  from(deleteAttachedCompany({ companyId })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.removeAttachCompanyError, false))
  );
