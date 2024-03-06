import { bind } from '@react-rxjs/core';
import { map, startWith } from 'rxjs';
import { Option } from 'components/types';
import { getCountryCodes } from 'api/ref-data';
import { PENDING } from 'state';
import { countries } from 'ref-data/countries';
import { CountryCodesQuery } from 'api/types';

const [, countryCodes$] = bind(
  (query?: CountryCodesQuery) => getCountryCodes(query).pipe(startWith(PENDING)),
  []
);

export const [useCountryOptions] = bind(
  (query?: CountryCodesQuery) =>
    countryCodes$(query).pipe(
      map((codes) => {
        if (codes !== PENDING && Array.isArray(codes)) {
          return codes.map<Option>(({ code }) => ({ value: code, label: countries[code] || code }));
        }

        return PENDING;
      })
    ),
  []
);
