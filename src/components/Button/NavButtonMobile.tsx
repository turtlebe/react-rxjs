import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { NavButton, NavButtonProps } from './NavButton';

export interface NavButtonMobileProps extends NavButtonProps {
  showLabel?: boolean;
}

const style = (theme: Theme) =>
  css({
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    borderRadius: 0,
    padding: theme.spacing(1, 0),

    '&.active': {
      color: theme.palette.primary.main,
      background: 'none',
    },

    '& svg': {
      width: 'auto',
      marginRight: 0,
    },
  });

export const NavButtonMobile = forwardRef<HTMLAnchorElement, NavButtonMobileProps>((props, ref) => {
  // remove the showLabel from the props as it gets passed from BottomNavigation
  const { showLabel, ...rest } = props;
  return <NavButton css={style} {...rest} ref={ref} textVariant="h5" />;
});
