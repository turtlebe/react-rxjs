import { createSignal } from '@react-rxjs/utils';
import { bind } from '@react-rxjs/core';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { Option } from 'components/types';
import { sortOptions } from 'utils/objects';
import { getLegalForms } from 'api/ref-data';
import { PENDING } from 'state';

const [countryToFetch$, loadLegalForms] = createSignal<string>();
export { loadLegalForms };

const [, legalForms$] = bind(
  countryToFetch$.pipe(
    distinctUntilChanged(),
    filter((country) => !!country),
    switchMap((country) => getLegalForms(country).pipe(startWith(PENDING)))
  ),
  []
);

export const [useLegalFormOptions] = bind(
  legalForms$.pipe(
    map((legalForms) =>
      legalForms !== PENDING && Array.isArray(legalForms)
        ? legalForms
            ?.map<Option>(({ elfCode, name }) => ({ label: name, value: elfCode }))
            .sort(sortOptions)
        : PENDING
    )
  ),
  []
);

export const [useLegalFormName] = bind(
  (code: string) =>
    legalForms$.pipe(
      map((legalForms) =>
        legalForms !== PENDING && Array.isArray(legalForms)
          ? legalForms.find(({ elfCode }) => elfCode === code)?.name
          : undefined
      )
    ),
  undefined
);
