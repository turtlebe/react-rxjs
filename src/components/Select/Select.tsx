import { forwardRef, Ref, useMemo } from 'react';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Option, OptionType } from 'components/types';
import { CircularProgress } from 'components/CircularProgress';

type SelectBaseProps = Omit<
  MuiTextFieldProps,
  'children' | 'color' | 'select' | 'size' | 'type' | 'variant'
>;

export interface SelectProps<T extends OptionType> extends SelectBaseProps {
  loading?: boolean;
  options: Option<T>[];
}

export const LoadingAdornment = ({ className }: { className?: string }) => (
  <InputAdornment
    className={className}
    css={(theme) => ({ marginRight: `-${theme.spacing(0.75)}` })}
    position="end"
  >
    <CircularProgress color="secondary" size={24} />
  </InputAdornment>
);

export const Select = forwardRef(
  <T extends OptionType>(props: SelectProps<T>, ref: Ref<HTMLDivElement>) => {
    const { InputProps, disabled, fullWidth = true, loading, options, ...rest } = props;

    const items = useMemo(
      () =>
        Array.isArray(options) &&
        options.map(({ label, value }) => (
          <MuiMenuItem key={value} value={value}>
            {label}
          </MuiMenuItem>
        )),
      [options]
    );

    return (
      <MuiTextField
        select
        color="secondary"
        disabled={disabled || loading}
        fullWidth={fullWidth}
        ref={ref}
        variant="outlined"
        InputProps={{
          ...InputProps,
          ...(loading && {
            endAdornment: <LoadingAdornment />,
          }),
        }}
        {...rest}
      >
        {items}
      </MuiTextField>
    );
  }
);
