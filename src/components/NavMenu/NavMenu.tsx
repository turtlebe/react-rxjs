import { forwardRef, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import MuiList from '@mui/material/List';
import { NavButton, NavButtonMobile } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  NavAccount,
  NavAccountFilled,
  NavOrders,
  NavOrdersFilled,
  NavFactoring,
  NavFactoringFilled,
} from 'theme/icons';
import { paths } from 'paths';
import { useFeatureEnabled } from 'state/user';

const phrases = (t: TranslateFn) => ({
  ordersLabel: t('Orders'),
  factoringLabel: t('Factoring'),
  accountLabel: t('Account'),
});

const style = (theme: Theme) =>
  css({
    '& > button:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  });

export const renderNavButtons = (
  ButtonComponent: typeof NavButton | typeof NavButtonMobile,
  translations: ReturnType<typeof phrases>,
  factoringEnabled: boolean
) => [
  <ButtonComponent
    icon={<NavOrders />}
    key="orders"
    label={translations.ordersLabel}
    selectedIcon={<NavOrdersFilled />}
    to={paths.root.orders.path}
  />,
  factoringEnabled && (
    <ButtonComponent
      icon={<NavFactoring />}
      key="factoring"
      label={translations.factoringLabel}
      selectedIcon={<NavFactoringFilled />}
      to={paths.root.factoring.path}
    />
  ),
  <ButtonComponent
    icon={<NavAccount />}
    key="account"
    label={translations.accountLabel}
    selectedIcon={<NavAccountFilled />}
    to={paths.root.account.path}
  />,
];

export const NavMenu = forwardRef<HTMLElement, {}>((_, ref) => {
  const translations = useTranslatedText(phrases);
  const factoringEnabled = useFeatureEnabled('FACTORING_WALBING');
  const navButtons = useMemo(
    () => renderNavButtons(NavButton, translations, factoringEnabled),
    [factoringEnabled, translations]
  );

  return (
    <MuiList component="nav" css={style} ref={ref}>
      {navButtons}
    </MuiList>
  );
});
