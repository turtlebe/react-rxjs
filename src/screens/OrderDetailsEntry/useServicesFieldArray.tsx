/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { OrderDetailsFormValues } from './types';
import { ServiceAndPaymentForm } from './ServiceAndPaymentForm';

const phrases = (t: TranslateFn) => ({
  freightTransport: t('Freight transport'),
});

export const useServicesFieldArray = (api: UseFormReturn<OrderDetailsFormValues>) => {
  const translations = useTranslatedText(phrases);
  const { append, fields, remove } = useFieldArray({
    name: 'services',
    control: api.control,
  });
  useEffect(() => {
    if (!fields.length) {
      append({ service: translations.freightTransport, netAmount: 0 });
    }
  }, [fields, append, translations]);

  const appendService = useCallback(() => {
    append({ service: '', netAmount: 0 });
  }, [append]);

  const serviceElements = useMemo(
    () =>
      fields.map((_, index) => (
        <ServiceAndPaymentForm handleDelete={remove} index={index} key={index} />
      )),
    [fields, remove]
  );

  return {
    appendService,
    serviceElements,
  };
};
