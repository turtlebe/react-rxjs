import { useMemo, useRef } from 'react';
import { startOfDay, subYears } from 'date-fns';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { DateFormField, DateFormFieldProps } from './DateFormField';

const phrases = (t: TranslateFn) => ({
  dobLabel: t('Date of birth'),
});

export const DobFormField = <TFieldValues extends { dob: any }>(
  props: Partial<DateFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const today = useRef(startOfDay(new Date()));
  const minDate = useMemo(() => subYears(today.current, 100), []);
  const maxDate = useMemo(() => subYears(today.current, 18), []);

  return (
    <DateFormField
      defaultCalendarMonth={maxDate}
      label={translations.dobLabel}
      maxDate={maxDate}
      minDate={minDate}
      name="dob"
      {...props}
    />
  );
};
