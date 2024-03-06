import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useNumberFormat = (value: number | undefined, options?: Intl.NumberFormatOptions) => {
  const { i18n } = useTranslation();

  const result = useMemo(() => {
    if (value === undefined) {
      return undefined;
    }

    const formatter = new Intl.NumberFormat(i18n.language, options);
    return formatter.format(value);
  }, [i18n.language, options, value]);

  return result;
};
