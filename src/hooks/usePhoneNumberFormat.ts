import { useMemo } from 'react';

export const usePhoneNumberFormat = (value: string) => {
  const result = useMemo(() => {
    const cleaned = value.replace(/[^\d]/g, '');
    const match =
      cleaned.length === 10
        ? cleaned.match(/^(\d{2})(\d{3})(\d{6})$/)
        : cleaned.match(/^(\d{2})(\d{3})(\d{7})$/);
    return match ? `+${match[1]} ${match[2]} ${match[3]}` : value;
  }, [value]);

  return result;
};
