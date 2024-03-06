import { Locale } from 'theme/icons/locales';

export const parseNumberString = (str: string, locale: Locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const numerals = [
    ...new Intl.NumberFormat(locale, { useGrouping: false }).format(9876543210),
  ].reverse();
  const index = new Map(numerals.map((d, i) => [d, String(i)]));
  const group = new RegExp(`[${parts.find((d) => d.type === 'group')?.value}]`, 'g');
  const decimal = new RegExp(`[${parts.find((d) => d.type === 'decimal')?.value}]`);
  const numeral = new RegExp(`[${numerals.join('')}]`, 'g');
  const getNumber = (d: string) => index.get(d)!;

  const result = str.trim().replace(group, '').replace(decimal, '.').replace(numeral, getNumber);
  return result ? +result : NaN;
};

export const formatAsPercentage = (value: any, decimalDigits: number): string => {
  let formattedNumber: string;
  if (typeof value === 'number') {
    formattedNumber = `${(value * 100).toFixed(decimalDigits)}%`;
  } else if (typeof value === 'string') {
    try {
      formattedNumber = `${(parseFloat(value) * 100).toFixed(decimalDigits)}%`;
    } catch (err) {
      formattedNumber = '';
    }
  } else {
    formattedNumber = '';
  }
  return formattedNumber;
};
