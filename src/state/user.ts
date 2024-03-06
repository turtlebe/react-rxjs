import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { filter, firstValueFrom, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { Option } from 'components/types';
import { sortOptions } from 'utils/objects';
import { getUser } from 'api/user';
import { NEW_ID, PENDING } from 'state';
// TODO - fix this cyclic dependency
// eslint-disable-next-line import/no-cycle
import { getKycWorkflowStatus, getNewKycCompanyId } from 'api/kyc';
import { AccountFeatureFunctionality, User } from 'api/types';
import { getCompanyAccountDetails } from 'api/bank-account';
import {
  getAccountCompanyData,
  removeAccountCompanyLogo,
  updateAccountCompanyLogo,
} from 'api/account';

const [refreshUser$, refreshUser] = createSignal<boolean>();
export { refreshUser };

const [setSelectedCompanyId$, setSelectedCompanyId] = createSignal<string | undefined>();
export { setSelectedCompanyId };

export const selectedCompanyId$ = setSelectedCompanyId$.pipe(
  map((companyId) => (companyId === NEW_ID ? undefined : companyId)),
  shareReplay(1)
);

export const nonEmptySelectedCompanyId$ = selectedCompanyId$.pipe(
  filter((companyId): companyId is string => !!companyId)
);

// dummy subscription to keep the shareReplay open
selectedCompanyId$.subscribe();

const user$ = refreshUser$.pipe(
  filter((loggedIn) => loggedIn),
  switchMap(() => getUser()),
  shareReplay(1)
);

user$.subscribe((user) => {
  setSelectedCompanyId(user && user.companies.length ? user.companies[0].companyId : undefined);
});

export const getCurrentUser = () => firstValueFrom(user$);

export const [useUser] = bind(
  user$.pipe(
    filter((user): user is User => !!user),
    startWith(PENDING)
  ),
  PENDING
);

export const [useUserCompanyOptions] = bind(
  user$.pipe(
    map((user) =>
      user
        ? user.companies
            .map<Option>((company) => ({
              label: company.companyName,
              value: company.companyId,
            }))
            .sort(sortOptions)
        : []
    )
  ),
  []
);

export const [useSelectedCompany, selectedCompany$] = bind(
  nonEmptySelectedCompanyId$.pipe(switchMap((companyId) => getAccountCompanyData(companyId))),
  undefined
);

export const getAccountCompanyLogo = () =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => getAccountCompanyData(companyId)),
      map((company) => company?.accountCompanyLogo?.logoUrl)
    )
  );

export const updateAccountCompanyLogoFile = (mimeType: string) =>
  nonEmptySelectedCompanyId$.pipe(
    switchMap((companyId) => updateAccountCompanyLogo(companyId, mimeType))
  );

export const deleteAccountCompanyLogoFile = () =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(switchMap((companyId) => removeAccountCompanyLogo(companyId)))
  );

export const getKycStatus = (companyId: string) => firstValueFrom(getKycWorkflowStatus(companyId));

export const getNewCompanyId = () => firstValueFrom(getNewKycCompanyId());

export const getAccountDetails = () =>
  firstValueFrom(
    selectedCompanyId$.pipe(
      switchMap((companyId) => (companyId ? getCompanyAccountDetails(companyId) : of(null)))
    )
  );

export const getCompanyDetails = () =>
  firstValueFrom(
    selectedCompanyId$.pipe(
      switchMap((companyId) => (companyId ? getAccountCompanyData(companyId) : of(null)))
    )
  );

export const useFeatureEnabled = (featureToCheck: AccountFeatureFunctionality) => {
  const company = useSelectedCompany();
  const featureFunctionality = company?.availableFeatures?.find(
    (feature) => feature.functionality === featureToCheck
  );
  // TODO: Check/improve this magic ;)
  return (
    featureFunctionality?.status === 'FEATURE_AVAILABLE' ||
    featureFunctionality?.status === 'USER_NOT_APPLIED' ||
    featureFunctionality?.status === 'VERIFICATION_IN_PROGRESS' ||
    featureFunctionality?.status === 'VERIFICATION_INSUFFICIENT_DATA'
  );
};
