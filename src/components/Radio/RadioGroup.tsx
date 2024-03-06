import { forwardRef, useId, useMemo } from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import { css, Theme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { Option } from 'components/types';
import { Radio } from './Radio';

type RadioGroupBaseProps = Omit<MuiRadioGroupProps, 'color' | 'onChange'>;

export interface RadioGroupProps extends RadioGroupBaseProps {
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  onChange?: (value: string) => void;
  options: Option[];
  value: string | undefined;
}

const style = (theme: Theme) =>
  css({
    '& .MuiFormControlLabel-root': {
      marginBottom: `-${theme.spacing(1)}`,
    },
  });

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { disabled, error, helperText, id, label, onChange, options, ...rest } = props;

  const { t } = useTranslation();
  const generatedId = useId();
  const resolvedId = id || generatedId;

  const optionComponents = useMemo(
    () =>
      options.map((o) => (
        <Radio
          disabled={disabled}
          key={o.value}
          label={typeof o.label === 'string' ? t(o.label) : o.label}
          value={o.value}
        />
      )),
    [options, disabled, t]
  );

  return (
    <FormControl error={error} ref={ref}>
      {label && <FormLabel id={resolvedId}>{label}</FormLabel>}
      <MuiRadioGroup
        aria-labelledby={resolvedId}
        css={style}
        onChange={(_, v) => {
          onChange?.(v);
        }}
        {...rest}
      >
        {optionComponents}
      </MuiRadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
