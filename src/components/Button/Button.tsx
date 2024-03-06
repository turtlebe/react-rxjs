import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type ButtonBaseProps = Omit<MuiButtonProps, 'color' | 'size' | 'variant'>;

export type ButtonSize = 'medium' | 'small';

export interface ButtonProps extends ButtonBaseProps {
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: ButtonSize;
}

const style = (color: ButtonProps['color']) => (theme: Theme) =>
  css({
    ...(color === 'tertiary' && {
      background: theme.palette.secondary.contrastText,
      color: theme.palette.secondary.dark,

      '&:hover': {
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
      },
    }),
    ...(color === 'secondary' && {
      background: theme.palette.secondary.light,

      '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
      },
    }),
  });

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, color = 'primary', fullWidth = true, size = 'medium', ...rest } = props;

  const muiColor = color === 'tertiary' ? 'secondary' : color;
  const muiVariant = color === 'primary' ? 'contained' : 'outlined';

  return (
    <MuiButton
      color={muiColor}
      css={style(color)}
      fullWidth={fullWidth}
      ref={ref}
      size={size}
      variant={muiVariant}
      {...rest}
    >
      {children}
    </MuiButton>
  );
});
