import { bind, shareLatest } from '@react-rxjs/core';
import {
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
  firstValueFrom,
  debounceTime,
  withLatestFrom,
  filter,
} from 'rxjs';
import { createSignal } from '@react-rxjs/utils';
import { CustomerCompany, CustomerCompanyContact } from 'api/types';
import { NEW_ID, PENDING } from 'state';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { getGlobalCompanyList, getPreviousCustomerList } from 'api/orders';
import { getCustomerCompany } from 'api/customer';
import { nonEmptySelectedCompanyId$ } from './user';

const [customerSearchText$, setCustomerSearchText] = createSignal<string>();
export { setCustomerSearchText };

const distinctSearchText$ = customerSearchText$.pipe(
  distinctUntilChanged(),
  startWith(''),
  shareLatest()
);

const globalCompaniesResponse$ = distinctSearchText$.pipe(
  debounceTime(500),
  filter((search): search is string => !!search && search.trim().length > 3),
  switchMap((search) => getGlobalCompanyList(search).pipe(startWith(PENDING))),
  shareLatest()
);

export const [useGlobalCustomers] = bind(globalCompaniesResponse$, []);

export const getPreviousCompanies = () =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(switchMap((companyId) => getPreviousCustomerList(companyId)))
  );

interface CompanyDetails {
  contacts?: CustomerCompanyContact[];
  creditWorthiness?: string;
  form: Partial<CustomerInformationFormValues>;
}

const generateContacts = (company: CustomerCompany): CustomerCompanyContact[] | undefined => {
  // CTFU -- only take replationship contacts right now, we figure out the public ones later.
  if (true) {
    return company.relationshipCompanyContacts;
  }

  if (!company.publicCompanyContacts && !company.relationshipCompanyContacts) {
    return undefined;
  }
  if (!company.publicCompanyContacts || !company.relationshipCompanyContacts) {
    return company.publicCompanyContacts || company.relationshipCompanyContacts;
  }

  return company.relationshipCompanyContacts!.concat(company.publicCompanyContacts!);
};

const transformApiToForm = (
  customerCompany: CustomerCompany | typeof PENDING | undefined
): CompanyDetails | typeof PENDING | undefined => {
  if (!customerCompany || customerCompany === PENDING) {
    return customerCompany;
  }

  return {
    contacts: generateContacts(customerCompany),
    form: {
      companyId: customerCompany.companyId,
      companyName: customerCompany.companyName,
      commercialRegisterNumber: customerCompany.details.commercialRegisterNumber,
      legalForm: customerCompany.details.legalForm,
      registrationAuthority: customerCompany.details.registrationAuthority,
      vatId: customerCompany.details.vatId,
      ...customerCompany.details.address,
    },
    creditWorthiness: customerCompany.businessAbilityKnowledge?.creditWorthiness,
  };
};

const [customerCompanyId$, loadCustomerCompanyDetails] = createSignal<string>();
export { loadCustomerCompanyDetails };

const [useCustomerCompanyDetails, customerCompanyDetails$] = bind(
  customerCompanyId$.pipe(
    distinctUntilChanged(),
    withLatestFrom(nonEmptySelectedCompanyId$),
    switchMap(([customerId, companyId]) => {
      if (customerId && customerId !== NEW_ID) {
        return getCustomerCompany({ companyId, customerId }).pipe(
          map(transformApiToForm),
          startWith(PENDING)
        );
      }
      return of(undefined);
    })
  ),
  undefined
);
export { useCustomerCompanyDetails };

export const [useCustomerCompanyContacts] = bind(
  customerCompanyDetails$.pipe(
    map((details) => {
      if (!!details && details !== PENDING && !!details?.contacts) {
        return details.contacts.sort((a, b) => a.contactName!.localeCompare(b.contactName!));
      }

      return [];
    })
  ),
  []
);
