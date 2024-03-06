import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { Option } from 'components/types';
import { sortOptions } from 'utils/objects';
import { getRegisterAuthorities } from 'api/ref-data';
import { PENDING } from 'state';

const [country$, loadRegisterAuthorities] = createSignal<string>();
export { loadRegisterAuthorities };

const [, registerAuthorities$] = bind(
  country$.pipe(
    distinctUntilChanged(),
    filter((country) => !!country),
    switchMap((country) => getRegisterAuthorities(country).pipe(startWith(PENDING)))
  ),
  []
);

export const [useRegisterAuthorityOptions] = bind(
  registerAuthorities$.pipe(
    map((authorities) =>
      authorities !== PENDING && Array.isArray(authorities)
        ? authorities
            ?.map<Option>(({ name, registerAuthorityCode }) => ({
              label: name,
              value: registerAuthorityCode,
            }))
            .sort(sortOptions)
        : authorities
    )
  ),
  []
);

const getRegisterAuthorityForCode = (code: string) =>
  registerAuthorities$.pipe(
    map((authorities) =>
      authorities !== PENDING && Array.isArray(authorities)
        ? authorities.find(({ registerAuthorityCode }) => registerAuthorityCode === code)
        : undefined
    )
  );

export const [useIsLicenseRequired] = bind(
  (code: string) =>
    getRegisterAuthorityForCode(code).pipe(
      map((authority) => authority?.registrationDocumentRequirement === 'REQUIRED')
    ),
  false
);

export const [useIsCommercialNumberRequired] = bind(
  (code: string) =>
    getRegisterAuthorityForCode(code).pipe(
      map((authority) => authority?.registrationNumberRequirement !== 'OPTIONAL')
    ),
  true
);
