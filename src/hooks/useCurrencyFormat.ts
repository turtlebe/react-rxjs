import { useNumberFormat } from './useNumberFormat';

export const useCurrencyFormat = (value: number | undefined) =>
  useNumberFormat(value, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
