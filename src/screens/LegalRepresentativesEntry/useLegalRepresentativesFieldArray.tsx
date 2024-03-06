import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { DEFAULT_REP_VALUES, LegalRepresentativeSubForm } from './LegalRepresentativeSubForm';
import { LegalRepresentativesFormValues } from './types';

export const useLegalRepresentativesFieldArray = (
  api: UseFormReturn<LegalRepresentativesFormValues>
) => {
  const { append, fields, remove, replace } = useFieldArray({
    name: 'representatives',
    control: api.control,
  });

  const appendRepresentative = useCallback(
    (shouldFocus: boolean = true) => {
      append(DEFAULT_REP_VALUES, { shouldFocus });
    },
    [append]
  );

  const powerOfRepresentation = api.watch('powerOfRepresentation');
  const representatives = api.watch('representatives');

  useEffect(() => {
    api.clearErrors();
  }, [api, powerOfRepresentation]);

  useEffect(() => {
    if (powerOfRepresentation === 'joint' && representatives.length < 2) {
      appendRepresentative(false);
    } else if (powerOfRepresentation === 'sole' && representatives.length > 1) {
      replace([representatives[0]]);
    }
  }, [
    appendRepresentative,
    powerOfRepresentation,
    replace,
    representatives,
    representatives.length,
  ]);

  const elements = useMemo(
    () =>
      fields.map((item, index) => (
        <LegalRepresentativeSubForm id={item.id} index={index} key={item.id} onRemoveRep={remove} />
      )),
    [fields, remove]
  );

  return {
    appendRepresentative,
    elements,
  };
};
