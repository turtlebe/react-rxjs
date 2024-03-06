import { forwardRef } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { css, Theme } from '@emotion/react';
import { ArrowLeft } from 'theme/icons';

type BackButtonBaseProps = Omit<
  MuiButtonProps,
  'children' | 'color' | 'endIcon' | 'fullWidth' | 'size' | 'startIcon' | 'variant'
>;

export interface BackButtonProps extends BackButtonBaseProps {
  color?: 'inherit' | 'primary' | 'secondary';
  label: string;
}

const style = (color: BackButtonProps['color']) => (theme: Theme) =>
  css({
    textTransform: 'uppercase',
    ...(color === 'secondary' && {
      color: theme.palette.text.primary,
    }),
    ...(color === 'inherit' && {
      color: theme.palette.primary.contrastText,
    }),
  });

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>((props, ref) => {
  const { color = 'secondary', label, ...rest } = props;

  return (
    <MuiButton
      color={color}
      css={style(color)}
      ref={ref}
      startIcon={<ArrowLeft />}
      variant="text"
      {...rest}
    >
      {label}
    </MuiButton>
  );
});
