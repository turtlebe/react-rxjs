import { useCallback, useMemo } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FilterOptionsState } from '@mui/material';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { LoadingAdornment } from 'components/Select';
import { TextInput } from 'components/TextInput';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';
import { NEW_ID } from 'state';
import { BaseFormFieldRenderProps, FormFieldProps } from './types';
import { BaseFormField } from './BaseFormField';
import { useFormFieldError, useFormFieldName } from './hooks';

const phrases = (t: TranslateFn) => ({
  addLabel: withParams<'name'>((p) => t('Add new "{{name}}"', p)),
  noOptions: t('No search results'),
});

export interface AutocompleteOption {
  id: string;
  label?: string;
  name: string;
}

const filter = createFilterOptions<AutocompleteOption>();

interface BaseAutocompleteWithCreateProps<TFieldValues extends FieldValues>
  extends Omit<FormFieldProps<TFieldValues>, 'name' | 'namePath'> {
  loading?: boolean;
  options: AutocompleteOption[];
}

interface AutocompleteWithCreateProps<TFieldValues extends FieldValues>
  extends BaseAutocompleteWithCreateProps<TFieldValues>,
    BaseFormFieldRenderProps<TFieldValues> {
  nameField: Path<TFieldValues>;
}

const DEFAULT_OPTION: AutocompleteOption = { id: '', name: '' };

const AutocompleteWithCreate = <TFieldValues extends FieldValues = FieldValues>(
  props: AutocompleteWithCreateProps<TFieldValues>
) => {
  const {
    disabled,
    error,
    field: { onChange, value, ...rest },
    helperText,
    isSubmitting,
    label,
    loading,
    nameField,
    options,
  } = props;
  const translations = useTranslatedText(phrases);
  const { getValues, setValue } = useFormContext<TFieldValues>();

  const autocompleteValue = useMemo(() => {
    const match = options.find(({ id }) => id === value);
    if (match) {
      return match;
    }

    if (value === NEW_ID) {
      const contactName = getValues(nameField);

      return {
        id: NEW_ID,
        name: contactName,
      };
    }

    return DEFAULT_OPTION;
  }, [options, value, getValues, nameField]);

  const handleChange = useCallback(
    (id: string, name?: string) => {
      onChange(id);
      setValue(nameField, name || ('' as any));
    },
    [nameField, onChange, setValue]
  );

  return (
    <Autocomplete
      {...rest}
      autoSelect
      blurOnSelect
      freeSolo
      handleHomeEndKeys
      selectOnFocus
      disabled={isSubmitting || loading || disabled}
      isOptionEqualToValue={(o, v) => o.id === v.id}
      noOptionsText={translations.noOptions}
      options={options}
      renderOption={(p, option) => <li {...p}>{option.label || option.name}</li>}
      value={autocompleteValue}
      filterOptions={(
        opts: AutocompleteOption[],
        params: FilterOptionsState<AutocompleteOption>
      ) => {
        const filtered = filter(opts, params);
        const { inputValue } = params;
        if (
          inputValue &&
          !filtered.some(({ name }) => name.toLowerCase() === inputValue.toLowerCase())
        ) {
          filtered.push({
            id: NEW_ID,
            name: inputValue,
            label: translations.addLabel({ name: inputValue.trim() }),
          });
        }

        return filtered;
      }}
      getOptionLabel={(option: AutocompleteOption | string) => {
        if (typeof option === 'string') {
          return option;
        }

        return option.name.trim();
      }}
      renderInput={(params) => (
        <TextInput
          {...params}
          error={!!error}
          helperText={helperText || error?.message}
          label={label}
          InputProps={{
            ...params.InputProps,
            ...(loading && {
              endAdornment: (
                <LoadingAdornment css={(theme) => ({ marginRight: theme.spacing(-0.25) })} />
              ),
            }),
          }}
        />
      )}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          const option = options.find(({ name }) => name === newValue);
          if (option) {
            handleChange(option.id);
          } else {
            handleChange(newValue ? NEW_ID : '', newValue);
          }
        } else if (newValue?.id === NEW_ID) {
          handleChange(NEW_ID, newValue.name);
        } else {
          handleChange(newValue?.id || '');
        }
      }}
    />
  );
};

export interface AutocompleteWithCreateFormFieldProps<TFieldValues extends FieldValues>
  extends BaseAutocompleteWithCreateProps<TFieldValues>,
    Pick<FormFieldProps<TFieldValues>, 'name' | 'namePath'> {
  idField: Path<TFieldValues>;
}

export const AutocompleteWithCreateFormField = <TFieldValues extends FieldValues = FieldValues>(
  props: AutocompleteWithCreateFormFieldProps<TFieldValues>
) => {
  const { idField, name, namePath, ...rest } = props;
  const error = useFormFieldError<TFieldValues>(name, namePath);
  const resolvedId = useFormFieldName(idField, namePath);
  const resolvedName = useFormFieldName(name, namePath);

  return (
    <BaseFormField<TFieldValues>
      name={resolvedId}
      render={(renderProps) => (
        <AutocompleteWithCreate {...rest} {...renderProps} error={error} nameField={resolvedName} />
      )}
    />
  );
};
