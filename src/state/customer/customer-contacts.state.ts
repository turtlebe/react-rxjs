import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { CustomerCompanyContact } from '../../api/types';
import { nonEmptySelectedCompanyId$ } from '../user';
import { apiCreateOrUpdatePrivateCustomerContact } from '../../api/customer/customer-contacts.api';

export const createOrUpdateCustomerContactObservable = (
  customerId: string,
  contact: CustomerCompanyContact | undefined
): Observable<CustomerCompanyContact | undefined> =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) =>
      apiCreateOrUpdatePrivateCustomerContact(
        {
          companyId,
          customerId,
        },
        contact
      )
    )
  );

export const createOrUpdateCustomerContact = (
  customerId: string,
  contact: CustomerCompanyContact | undefined
): Promise<CustomerCompanyContact | undefined> =>
  firstValueFrom(createOrUpdateCustomerContactObservable(customerId, contact));
