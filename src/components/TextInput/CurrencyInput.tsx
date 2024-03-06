import { forwardRef } from 'react';
import { getParamByISO } from 'iso-country-currency';
import { CountryCode } from 'ref-data/countries';
import { NumberInput, NumberInputProps } from './NumberInput';

export interface CurrencyInputProps extends NumberInputProps {
  country: CountryCode;
}

export const CurrencyInput = forwardRef<HTMLDivElement, CurrencyInputProps>((props, ref) => {
  const { country, ...rest } = props;
  const symbol = getParamByISO(country, 'symbol');

  return <NumberInput decimals={2} min={0} ref={ref} {...rest} unit={symbol} />;
});
