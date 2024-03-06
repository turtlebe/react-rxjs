import { useCallback, useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { BeneficialOwnerSubForm, DEFAULT_OWNER_VALUES } from './BeneficialOwnerSubForm';
import { BeneficialOwnersFormValues } from './types';

export const useBeneficialOwnersFieldArray = (api: UseFormReturn<BeneficialOwnersFormValues>) => {
  const { append, fields, remove } = useFieldArray({
    name: 'beneficialOwners',
    control: api.control,
  });

  const appendOwner = useCallback(() => {
    append(DEFAULT_OWNER_VALUES);
  }, [append]);

  const elements = useMemo(
    () =>
      fields.map((item, index) => (
        <BeneficialOwnerSubForm id={item.id} index={index} key={item.id} onRemoveOwner={remove} />
      )),
    [fields, remove]
  );

  return {
    appendOwner,
    elements,
  };
};
