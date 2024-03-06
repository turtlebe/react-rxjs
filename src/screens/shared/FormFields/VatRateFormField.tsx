import { useMemo } from 'react';
import { Option } from 'components/types';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { SelectFormField, SelectFormFieldProps } from './SelectFormField';

const phrases = (t: TranslateFn) => ({
  label: t('VAT rate'),
  zero: t('0%'),
  one: t('1%'),
  two: t('2%'),
  three: t('3%'),
  four: t('4%'),
  five: t('5%'),
  six: t('6%'),
  seven: t('7%'),
  eight: t('8%'),
  nine: t('9%'),
  ten: t('10%'),
  eleven: t('11%'),
  twelve: t('12%'),
  thirteen: t('13%'),
  fourteen: t('14%'),
  fivteen: t('15%'),
  sixteen: t('16%'),
  seventeen: t('17%'),
  eighteen: t('18%'),
  nineteen: t('19%'),
  twenty: t('20%'),
  twentyone: t('21%'),
  twentytwo: t('22%'),
  twentythree: t('23%'),
  twentyfour: t('24%'),
  twentyfive: t('25%'),
  twentysix: t('26%'),
  twentyseven: t('27%'),
});

export const VatRateFormField = <TFieldValues extends { vatRate: any }>(
  props: Partial<SelectFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);

  // CTFU: Can probably be done in a more beautiful way but right now we need to unblock our users
  const options: Option<number>[] = useMemo(
    () => [
      {
        label: translations.zero,
        value: 0.0,
      },
      {
        label: translations.one,
        value: 0.01,
      },
      {
        label: translations.two,
        value: 0.02,
      },
      {
        label: translations.three,
        value: 0.03,
      },
      {
        label: translations.four,
        value: 0.04,
      },
      {
        label: translations.five,
        value: 0.05,
      },
      {
        label: translations.six,
        value: 0.06,
      },
      {
        label: translations.seven,
        value: 0.07,
      },
      {
        label: translations.eight,
        value: 0.08,
      },
      {
        label: translations.nine,
        value: 0.09,
      },
      {
        label: translations.ten,
        value: 0.1,
      },
      {
        label: translations.eleven,
        value: 0.11,
      },
      {
        label: translations.twelve,
        value: 0.12,
      },
      {
        label: translations.thirteen,
        value: 0.13,
      },
      {
        label: translations.fourteen,
        value: 0.14,
      },
      {
        label: translations.fivteen,
        value: 0.15,
      },
      {
        label: translations.sixteen,
        value: 0.16,
      },
      {
        label: translations.seventeen,
        value: 0.17,
      },
      {
        label: translations.eighteen,
        value: 0.18,
      },
      {
        label: translations.nineteen,
        value: 0.19,
      },
      {
        label: translations.twenty,
        value: 0.2,
      },
      {
        label: translations.twentyone,
        value: 0.21,
      },
      {
        label: translations.twentytwo,
        value: 0.22,
      },
      {
        label: translations.twentythree,
        value: 0.23,
      },
      {
        label: translations.twentyfour,
        value: 0.24,
      },
      {
        label: translations.twentyfive,
        value: 0.25,
      },
      {
        label: translations.twentysix,
        value: 0.26,
      },
      {
        label: translations.twentyseven,
        value: 0.27,
      },
    ],
    [translations]
  );

  return <SelectFormField label={translations.label} name="vatRate" options={options} {...props} />;
};
