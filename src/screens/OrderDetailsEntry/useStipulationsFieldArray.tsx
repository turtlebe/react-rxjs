/* eslint-disable react/no-array-index-key */
import { useCallback, useMemo } from 'react';
import { Theme, css } from '@emotion/react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { IconButton } from 'components/Button';
import { StipulationFormField } from 'screens/shared/FormFields';
import { Bin } from 'theme/icons';
import { OrderDetailsFormValues } from './types';

const stipulationStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1.25),
  });

export const useStipulationsFieldArray = (api: UseFormReturn<OrderDetailsFormValues>) => {
  const { append, fields, remove } = useFieldArray({
    name: 'stipulations',
    control: api.control,
  });

  const appendStipulation = useCallback(() => {
    append([{ stipulation: '' }]);
  }, [append]);

  const stipulationElements = useMemo(
    () =>
      fields.map((item, index) => (
        <div css={stipulationStyle} key={index}>
          <StipulationFormField namePath={['stipulations', index]} />
          <IconButton
            css={(theme) => ({ marginTop: theme.spacing(-1) })}
            onClick={() => remove(index)}
          >
            <Bin />
          </IconButton>
        </div>
      )),
    [fields, remove]
  );

  return {
    appendStipulation,
    stipulationElements,
  };
};
