import { catchError, from, map, Observable } from 'rxjs';
import { handleError, toResponseData } from 'utils/api';
import { bffFetcher } from './fetch';
import { Country, CountryCodesQuery, LegalForm, RegisterAuthority } from './types';

// dummy t function for translation extraction
const t = (str: string) => str;
const phrases = {
  getLegalFormsError: t('An error occurred fetching legal forms'),
  getRegisterAuthoritiesError: t('An error occurred fetching registration authorities'),
  getCompanyNamesError: t('An error occurred fetching company names'),
  getCompanyDetailsError: t('An error occurred fetching company details'),
  getCountryCodesError: t('An error occurred fetching the country codes'),
};

const fetchLegalForms = bffFetcher
  .path('/ref-data/legal-forms/{countryCode}')
  .method('get')
  .create();
export const getLegalForms = (countryCode: string): Observable<LegalForm[]> =>
  from(fetchLegalForms({ countryCode })).pipe(
    map(toResponseData([])),
    catchError(handleError(phrases.getLegalFormsError, []))
  );

const fetchRegisterAuthorities = bffFetcher
  .path('/ref-data/register-authorities/{countryCode}')
  .method('get')
  .create();
export const getRegisterAuthorities = (countryCode: string): Observable<RegisterAuthority[]> =>
  from(fetchRegisterAuthorities({ countryCode })).pipe(
    map(toResponseData([])),
    catchError(handleError(phrases.getRegisterAuthoritiesError, []))
  );

const fetchCountryCodes = bffFetcher.path('/ref-data/countries').method('get').create();
export const getCountryCodes = (query: CountryCodesQuery = {}): Observable<Country[]> =>
  from(fetchCountryCodes(query)).pipe(
    map(toResponseData([])),
    catchError(handleError(phrases.getCountryCodesError, []))
  );
