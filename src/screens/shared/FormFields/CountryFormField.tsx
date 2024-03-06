import { useMemo } from 'react';
import { Option } from 'components/types';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useTranslatedOptions } from 'hooks/useTranslatedOptions';
import { sortOptions } from 'utils/objects';
import { useCountryOptions } from 'state/countries';
import { PENDING } from 'state';
import { countries, CountryCode } from 'ref-data/countries';
import { CountryCodesQuery } from 'api/types';
import { SelectFormField, SelectFormFieldProps } from './SelectFormField';

const phrases = (t: TranslateFn) => ({ label: t('Country') });

export interface CountryFormFieldProps<TFieldValues extends { country: any }>
  extends Partial<SelectFormFieldProps<TFieldValues>> {
  onlyCountries?: CountryCode[];
  query?: CountryCodesQuery;
}

export const CountryFormField = <TFieldValues extends { country: any }>(
  props: CountryFormFieldProps<TFieldValues>
) => {
  const { onlyCountries, query, ...rest } = props;
  const translations = useTranslatedText(phrases);

  const countryOptions = useCountryOptions(query);
  const optionsToUse = useMemo(() => {
    if (onlyCountries) {
      return onlyCountries.map<Option>((code) => ({ value: code, label: countries[code] }));
    }

    return countryOptions !== PENDING ? countryOptions : [];
  }, [countryOptions, onlyCountries]);

  const options = useTranslatedOptions(optionsToUse).sort(sortOptions);

  return (
    <SelectFormField
      label={translations.label}
      loading={countryOptions === PENDING}
      name="country"
      options={options}
      {...rest}
    />
  );
};
