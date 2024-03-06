import { FocusEvent, FocusEventHandler, forwardRef, useCallback, useEffect, useState } from 'react';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import { de as deLocale, enUS as enUSLocale } from 'date-fns/locale';
import { TextInput, TextInputProps } from 'components/TextInput';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Calendar } from 'theme/icons';

const phrases = (t: TranslateFn) => ({
  invalidDateMessage: t('Please enter a valid date'),
  dateFormat: t('MM/DD/YYYY'),
});

type LocaleConfig = { locale: Locale };
const languageToLocale: { [key: string]: LocaleConfig } = {
  'de-DE': { locale: deLocale },
  'en-US': { locale: enUSLocale },
};

type DateInputBaseProps = Omit<MuiDatePickerProps<Date, Date>, 'renderInput' | 'size'>;

export interface DateInputProps
  extends DateInputBaseProps,
    Pick<TextInputProps, 'error' | 'helperText'> {}

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>((props, ref) => {
  const { error, helperText, label: labelFromProps, onChange, onError, ...rest } = props;
  const { i18n } = useTranslation();
  const translations = useTranslatedText(phrases);
  const [internalError, setInternalError] = useState<string>();
  const [currentLocale, setCurrentLocale] = useState<LocaleConfig>(
    languageToLocale[i18n.language] || languageToLocale['de-DE']
  );

  const handleError = useCallback(
    (reason: DateValidationError, value: Date | null) => {
      switch (reason) {
        case 'invalidDate':
          setInternalError(translations.invalidDateMessage);
          break;
        default:
          setInternalError(undefined);
      }

      onError?.(reason, value);
    },
    [onError, translations]
  );

  const handleBlur = useCallback(
    (paramsOnBlur: FocusEventHandler<HTMLInputElement> | undefined) =>
      (e: FocusEvent<HTMLInputElement>) => {
        if (internalError) {
          onChange(null);
        }

        paramsOnBlur?.(e);
      },
    [internalError, onChange]
  );

  useEffect(() => {
    const localeToSet = languageToLocale[i18n.language];
    if (localeToSet && localeToSet.locale.code !== currentLocale.locale.code) {
      setCurrentLocale(localeToSet);
    }
  }, [i18n.language, currentLocale.locale.code]);

  const label = labelFromProps ? `${labelFromProps}` : undefined;

  return (
    <LocalizationProvider adapterLocale={currentLocale.locale} dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        {...rest}
        label={label}
        ref={ref}
        components={{
          OpenPickerIcon: Calendar,
        }}
        renderInput={(params) => (
          <TextInput
            {...params}
            error={error || !!internalError}
            helperText={internalError || helperText}
            inputProps={{
              ...params.inputProps,
              placeholder: translations.dateFormat,
            }}
            onBlur={handleBlur(params.onBlur)}
          />
        )}
        onChange={onChange}
        onError={handleError}
      />
    </LocalizationProvider>
  );
});
