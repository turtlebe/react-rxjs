import { forwardRef, ReactNode } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { css, Theme } from '@emotion/react';
import { NavLink, To, useMatch } from 'react-router-dom';
import { Typography } from 'components/Typography';
import gradients from 'theme/gradients';
import type { TypographyVariant } from '@mui/material';

type NavButtonBaseProps = Omit<
  MuiButtonProps<typeof NavLink>,
  'children' | 'color' | 'component' | 'size'
>;

export interface NavButtonProps extends NavButtonBaseProps {
  icon: ReactNode;
  label: string;
  selectedIcon: ReactNode;
  textVariant?: TypographyVariant;
  to: To;
}

const style = (theme: Theme) =>
  css({
    justifyContent: 'flex-start',
    height: theme.spacing(5),
    width: '100%',
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.secondary,

    '&.active': {
      color: theme.palette.primary.contrastText,
      background: gradients.ForestNavGradient,
    },

    '& svg': {
      fontSize: 25,
      marginRight: theme.spacing(1.25),
    },
  });

export const NavButton = forwardRef<HTMLAnchorElement, NavButtonProps>((props, ref) => {
  const { icon, label, selectedIcon, textVariant = 'h4', to, ...rest } = props;

  const isActive = useMatch({ path: to.toString(), end: false });

  return (
    <MuiButton aria-label={label} component={NavLink} css={style} ref={ref} to={to} {...rest}>
      {isActive ? selectedIcon : icon}
      <Typography variant={textVariant}>{label}</Typography>
    </MuiButton>
  );
});
