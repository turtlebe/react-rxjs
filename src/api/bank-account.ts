import { from, map, Observable } from 'rxjs';
import { toResponseData } from 'utils/api';
import { CompanyAccountDetails } from './types';
import { fetcher } from './fetch';

const fetchBankAccount = fetcher
  .path('/company/{companyId}/account-details')
  .method('get')
  .create();
export const getCompanyAccountDetails = (
  companyId: string
): Observable<CompanyAccountDetails | null> =>
  from(fetchBankAccount({ companyId })).pipe(map(toResponseData(null)));
