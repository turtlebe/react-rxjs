import { forwardRef, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import MuiBottomNavigation, {
  BottomNavigationProps as MuiBottomNavigationProps,
} from '@mui/material/BottomNavigation';
import MuiPaper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import { NavButtonMobile } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { paths } from 'paths';
import { useFeatureEnabled } from 'state/user';
import { renderNavButtons } from '../NavMenu';

const phrases = (t: TranslateFn) => ({
  ordersLabel: t('Orders'),
  factoringLabel: t('Factoring'),
  accountLabel: t('Account'),
});

type NavBarMobileBaseProps = Omit<MuiBottomNavigationProps, 'showLabels'>;

export interface NavBarMobileProps extends NavBarMobileBaseProps {}

const style = (theme: Theme) =>
  css({
    background: theme.palette.background.default,
    height: theme.spacing(8),
  });

const barStyle = (theme: Theme) =>
  css({
    height: theme.spacing(0.5),
    width: theme.spacing(7),
    position: 'absolute',
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 0, 1.25, 1.25),
    top: 0,
    transform: 'translateX(-50%)',
    transition: 'left 0.1s',
  });

export const NavBarMobile = forwardRef<HTMLDivElement, NavBarMobileProps>((props, ref) => {
  const { className, ...rest } = props;
  const translations = useTranslatedText(phrases);

  const { pathname } = useLocation();
  const splitPath = pathname.split('/');
  const firstPath = splitPath.length > 1 ? splitPath[1] : '';
  const factoringEnabled = useFeatureEnabled('FACTORING_WALBING');

  let multiplier = 1;
  switch (firstPath) {
    case paths.root.orders.path:
      multiplier = factoringEnabled ? 1 : 1.5;
      break;
    case paths.root.factoring.path:
      multiplier = 3;
      break;
    case paths.root.account.path:
      multiplier = factoringEnabled ? 5 : 4.5;
      break;
    default:
      multiplier = 0;
  }

  const navButtons = useMemo(
    () => renderNavButtons(NavButtonMobile, translations, factoringEnabled),
    [factoringEnabled, translations]
  );

  return (
    <MuiPaper
      className={className}
      css={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
      ref={ref}
    >
      <div
        css={barStyle}
        style={{
          left: `calc(calc(100% / 6) * ${multiplier})`,
          display: multiplier ? 'block' : 'none',
        }}
      />
      <MuiBottomNavigation showLabels css={style} {...rest}>
        {navButtons}
      </MuiBottomNavigation>
    </MuiPaper>
  );
});
