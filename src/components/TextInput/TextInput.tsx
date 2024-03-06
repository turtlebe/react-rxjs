import { forwardRef, useCallback, useMemo, useState } from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Eye } from 'theme/icons';
import { IconButton } from '../Button';

type TextInputBaseProps = Omit<MuiTextFieldProps, 'color' | 'select' | 'size' | 'variant'>;

export interface TextInputProps extends TextInputBaseProps {}

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>((props, ref) => {
  const { InputProps, fullWidth = true, type, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const endAdornment = useMemo(() => {
    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            edge="end"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            <Eye />
          </IconButton>
        </InputAdornment>
      );
    }

    return InputProps?.endAdornment;
  }, [InputProps?.endAdornment, handleClickShowPassword, handleMouseDownPassword, type]);

  const inputProps = useMemo(
    () => ({
      endAdornment,
      ...InputProps,
    }),
    [endAdornment, InputProps]
  );

  return (
    <MuiTextField
      InputProps={inputProps}
      color="secondary"
      fullWidth={fullWidth}
      ref={ref}
      type={type !== 'password' || !showPassword ? type : 'text'}
      variant="outlined"
      {...rest}
    />
  );
});
