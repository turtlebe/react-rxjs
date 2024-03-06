import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';

export interface CheckboxProps
  extends MuiCheckboxProps,
    Pick<FormControlLabelProps, 'label' | 'labelPlacement'> {
  error?: boolean;
  helperText?: string;
}

const style = (hasError: boolean) => (theme: Theme) =>
  css({
    '&:not(.Mui-checked)': {
      opacity: 0.2,
    },

    ...(hasError && {
      color: theme.palette.error.main,

      '&:not(.Mui-checked)': {
        opacity: 0.8,
      },
    }),
  });

const helperTextStyle = (hasLabel: boolean) => (theme: Theme) =>
  css({
    marginLeft: theme.spacing(0.25),

    ...(hasLabel && {
      marginLeft: theme.spacing(3.875),
    }),
  });

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const { className, error, helperText, label, labelPlacement, ...rest } = props;

  return (
    <FormControl className={className} error={error}>
      <FormControlLabel
        control={<MuiCheckbox css={style(!!error)} ref={ref} {...rest} />}
        label={label}
        labelPlacement={labelPlacement}
      />
      {helperText && <FormHelperText css={helperTextStyle(!!label)}>{helperText}</FormHelperText>}
    </FormControl>
  );
});
