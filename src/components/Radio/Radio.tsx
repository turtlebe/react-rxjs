import { forwardRef } from 'react';
import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { css, Theme } from '@emotion/react';

export interface RadioProps
  extends MuiRadioProps,
    Pick<FormControlLabelProps, 'label' | 'labelPlacement'> {}

const style = (theme: Theme) =>
  css({
    color: theme.palette.primary.main,
  });

export const Radio = forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  const { label, labelPlacement, value, ...rest } = props;

  return (
    <FormControlLabel
      control={<MuiRadio css={style} ref={ref} {...rest} />}
      label={label}
      labelPlacement={labelPlacement}
      value={value}
    />
  );
});
