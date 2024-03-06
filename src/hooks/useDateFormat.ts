import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useDateFormat = (value?: Date | string, options?: Intl.DateTimeFormatOptions) => {
  const { i18n } = useTranslation();

  const result = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(i18n.language, options);

    if (!value) {
      return '';
    }

    return formatter.format(typeof value === 'string' ? new Date(value) : value);
  }, [i18n.language, options, value]);

  return result;
};
