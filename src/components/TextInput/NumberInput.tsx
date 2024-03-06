import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { parseNumberString } from 'utils/number';
import { Locale } from 'theme/icons/locales';
import { TextInput, TextInputProps } from './TextInput';

type NumberInputBaseProps = Omit<TextInputProps, 'onChange' | 'type' | 'value'>;

export interface NumberInputProps extends NumberInputBaseProps {
  decimals?: number;
  locale?: Locale;
  max?: number;
  min?: number;
  onChange?: (value: number | null) => void;
  unit?: string;
  value?: number | null;
}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => {
  const {
    InputProps,
    decimals,
    locale = 'de-DE',
    max,
    min,
    onBlur,
    onChange,
    unit,
    value,
    ...rest
  } = props;

  const fmt = useMemo(
    () => Intl.NumberFormat(locale, { minimumFractionDigits: decimals }),
    [locale, decimals]
  );
  const valueString =
    Number.isNaN(value) || value === null || value === undefined ? '' : fmt.format(value);
  const [internalValue, setInternalValue] = useState<string>(valueString);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const change = e.target.value;
    const match = change.match(/^[0-9,.\- ]*$/);

    if (change === '' || match) {
      setInternalValue(change);
    }
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      let parsed = parseNumberString(internalValue, locale);

      if (decimals !== undefined) {
        parsed = Math.round(parsed * 10 ** decimals) / 10 ** decimals;
      }

      if (min !== undefined && parsed < min) {
        parsed = min;
      } else if (max !== undefined && parsed > max) {
        parsed = max;
      }

      if (Number.isNaN(parsed) && internalValue !== '') {
        setInternalValue(valueString);
      } else {
        onChange?.(internalValue === '' ? null : parsed);
        setInternalValue(internalValue === '' ? '' : fmt.format(parsed));
      }

      onBlur?.(e);
    },
    [decimals, fmt, internalValue, locale, max, min, onBlur, onChange, valueString]
  );

  useEffect(() => {
    setInternalValue(valueString);
  }, [valueString]);

  return (
    <TextInput
      {...rest}
      ref={ref}
      value={internalValue}
      InputProps={{
        ...InputProps,
        endAdornment: unit ? <InputAdornment position="end">{unit}</InputAdornment> : undefined,
      }}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
});
