import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import {
  switchMap,
  map,
  startWith,
  filter,
  merge,
  scan,
  firstValueFrom,
  withLatestFrom,
} from 'rxjs';
import { PENDING } from 'state';
import { AttachedCompaniesResponse } from 'ref-data/admin';
import { AttachedCompany } from 'api/types';
import {
  attachCompany,
  getAttachedCompanies,
  getRegisteredCompanies,
  removeAttachedCompany,
} from '../api/admin';

const [attachedCompanyList$, setAttachedCompanyList] = createSignal();
export { setAttachedCompanyList };

const [deleteCompanyId$, deleteCompanyId] = createSignal<string>();
export { deleteCompanyId };

const [attachCompanyId$, attachCompanyId] = createSignal<AttachedCompany>();
export { attachCompanyId };

type RemoveAttachedCompanyResponse = {
  companyId: string;
  result: boolean;
};

type AttachCompanyResponse = {
  company: AttachedCompany;
  result: boolean;
};

const deleteResponse$ = deleteCompanyId$.pipe(
  switchMap((companyId) =>
    removeAttachedCompany(companyId).pipe(
      map(
        (result): RemoveAttachedCompanyResponse => ({
          companyId,
          result,
        })
      ),
      startWith({ companyId, result: PENDING })
    )
  ),
  shareLatest()
);

const attachResponse$ = attachCompanyId$.pipe(
  switchMap(({ attachedUntil, companyId, companyName, role }) =>
    attachCompany(companyId, role, attachedUntil).pipe(
      map(
        (result): AttachCompanyResponse => ({
          company: { companyId, role, attachedUntil, companyName },
          result,
        })
      ),
      startWith({ company: { companyId, role, attachedUntil, companyName }, result: PENDING })
    )
  ),
  shareLatest()
);

const deleteAttachedCompanyAction$ = deleteResponse$.pipe(
  filter(
    (response): response is RemoveAttachedCompanyResponse =>
      response.result && response.result !== PENDING
  ),
  map(({ companyId }) => ({
    action: 'delete' as const,
    companyId,
  }))
);

const attachCompanyAction$ = attachResponse$.pipe(
  filter(
    (response): response is AttachCompanyResponse => response.result && response.result !== PENDING
  ),
  map(({ company }) => ({
    action: 'attach' as const,
    company,
  }))
);

const attachedCompanyListResponse$ = attachedCompanyList$.pipe(
  switchMap(() => getAttachedCompanies().pipe(startWith(PENDING))),
  shareLatest()
);

const loadAttachedCompaniesAction$ = attachedCompanyListResponse$.pipe(
  filter((response): response is AttachedCompaniesResponse => !!response && response !== PENDING),
  withLatestFrom(attachedCompanyList$),
  map(([{ attachedCompanies }]) => ({
    action: 'load' as const,
    attachedCompanies,
  }))
);

type AttachedCompanyListState = { [id: string]: AttachedCompany };
const EMPTY_STATE: AttachedCompanyListState = {};

const AttachedCompaniesList$ = merge(
  deleteAttachedCompanyAction$,
  loadAttachedCompaniesAction$,
  attachCompanyAction$
).pipe(
  scan((acc, next) => {
    const result: AttachedCompanyListState = { ...acc };
    if (next.action === 'delete') {
      delete result[next.companyId];
    } else if (next.action === 'attach') {
      result[next.company.companyId] = next.company;
    } else if (next.action === 'load') {
      Object.values(result).forEach(({ companyId }) => {
        delete result[companyId];
      });

      next.attachedCompanies.forEach((company) => {
        result[company.companyId] = company;
      });
    }
    return result;
  }, EMPTY_STATE)
);

export const [useAttachedCompaniesList] = bind(
  AttachedCompaniesList$.pipe(map((state) => Object.values(state).map((company) => company))),
  []
);

export const [useDeleteAttachedCompanyStatus] = bind(
  (companyId: string | undefined) =>
    deleteResponse$.pipe(
      filter((response) => response.companyId === companyId && companyId !== undefined),
      map(({ result }) => result)
    ),
  undefined
);

export const [useAttachCompanyStatus] = bind(
  (company: AttachedCompany | undefined) =>
    attachResponse$.pipe(
      filter((response) => response.company === company && company !== undefined),
      map(({ result }) => result)
    ),
  undefined
);

export const getAllCompanies = () => firstValueFrom(getRegisteredCompanies());
