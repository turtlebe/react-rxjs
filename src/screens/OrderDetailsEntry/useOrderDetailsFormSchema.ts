import { useMemo } from 'react';
import { array, date, number, object, string } from 'yup';
import { TranslateFn, useTranslatedText } from '../../hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  startMustBeBeforeEnd: t('Time window cannot end before it starts'),
  unloadingMustBeAfterLoading: t('Cannot start before loading'),
});

export const useOrderDetailsFormSchema = () => {
  const translations = useTranslatedText(phrases);

  return useMemo(
    () =>
      object({
        customerOrderNumber: string(),
        loadingVenueName: string(),
        unloadingVenueName: string(),
        loadingTimeWindowStart: date().nullable(),
        loadingTimeWindowEnd: date()
          .nullable()
          .test('bigger-than-start', translations.startMustBeBeforeEnd, (value, context) => {
            if (value && context.parent.loadingTimeWindowStart) {
              return value.getTime() > context.parent.loadingTimeWindowStart.getTime();
            }
            return true;
          }),
        unloadingTimeWindowStart: date()
          .nullable()
          .test(
            'bigger-than-loading',
            translations.unloadingMustBeAfterLoading,
            (value, context) => {
              if (value && context.parent.loadingTimeWindowEnd) {
                return value.getTime() > context.parent.loadingTimeWindowEnd.getTime();
              }
              if (value && context.parent.loadingTimeWindowStart) {
                return value.getTime() > context.parent.loadingTimeWindowStart.getTime();
              }
              return true;
            }
          ),
        unloadingTimeWindowEnd: date()
          .nullable()
          .test('bigger-than-start', translations.startMustBeBeforeEnd, (value, context) => {
            if (value && context.parent.unloadingTimeWindowStart) {
              return value.getTime() > context.parent.unloadingTimeWindowStart.getTime();
            }
            return true;
          }),
        services: array().of(
          object({
            service: string(),
            netAmount: number(),
          })
        ),
        loadDescription: string(),
        loadingAddressAddOn: string(),
        loadingStreetAndNumber: string(),
        loadingCity: string(),
        loadingCountry: string(),
        loadingPostCode: string(),
        unloadingAddressAddOn: string(),
        unloadingStreetAndNumber: string(),
        unloadingCity: string(),
        unloadingCountry: string(),
        unloadingPostCode: string(),
      }),
    [translations]
  );
};
