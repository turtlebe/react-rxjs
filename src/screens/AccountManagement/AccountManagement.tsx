import { memo, useMemo, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { Menu } from 'components/Menu';
import { CompanyAvatar } from 'components/CompanyAvatar';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PENDING } from 'state';
import { useSelectedCompany, useUser } from 'state/user';
import { Account, ArrowRight, Globe, Logout, Support } from 'theme/icons';
import { MenuItemProps } from 'components/Menu/MenuItem';
import { paths, sibling } from 'paths';
import { ContactPopup } from 'screens/shared/ContactPopup';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Your account'),
  // ORDERBOOK_PRODUCT_COMMENT
  // accountDetails: t('Account & company details'),
  accountDetails: t('Company details'),
  termsConditions: t('Terms & conditions'),
  language: t('Language'),
  contact: t('Contact truckOS'),
  logout: t('Log out'),
});

const DEFAULT_AVATAR = '/files/logo.png';

const wrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),
  });

export const AccountManagement = memo(() => {
  const navigate = useNavigate();
  const translations = useTranslatedText(phrases);
  const user = useUser();
  const accountCompany = useSelectedCompany();
  const isMobileView = useIsMobileView();
  const [showModal, setShowModal] = useState(false);

  const mainItems = useMemo(
    () => [
      {
        leftIcon: <Account />,
        rightIcon: <ArrowRight />,
        text: translations.accountDetails,
        borderBottom: true,
        onClickItem: () => navigate(sibling(paths.root.account.details.path)),
      },
      // ORDERBOOK_PRODUCT_COMMENT
      // {
      //   leftIcon: <TermsConditions />,
      //   rightIcon: <ArrowRight />,
      //   text: translations.termsConditions,
      //   borderBottom: true,
      //   onClickItem: () => navigate(sibling(paths.root.account.termsAndConditions.path)),
      // },
      {
        leftIcon: <Globe />,
        rightIcon: <ArrowRight />,
        text: translations.language,
        onClickItem: () => navigate(sibling(paths.root.account.languageSettings.path)),
      },
    ],
    [translations, navigate]
  );

  const bottomItems: MenuItemProps[] = useMemo(
    () => [
      {
        leftIcon: <Support />,
        text: translations.contact,
        textColor: 'main',
        borderBottom: true,
        onClickItem: () => setShowModal(true),
      },
      {
        leftIcon: <Logout />,
        text: translations.logout,
        textColor: 'main',
        onClickItem: () => navigate(sibling(paths.root.logout.path)),
      },
    ],
    [translations, navigate]
  );

  return (
    <Page>
      <>
        {user !== PENDING ? (
          <div css={wrapperStyle}>
            <Typography variant={isMobileView ? 'h2' : 'h1'}>{translations.titleLabel}</Typography>
            {isMobileView && (
              <div css={{ display: 'flex', alignItems: 'center', flexFlow: 'column' }}>
                <CompanyAvatar
                  avatarUrl={accountCompany?.accountCompanyLogo?.logoUrl || DEFAULT_AVATAR}
                  name={`${user.firstName} ${user.lastName}`}
                />
                <Typography variant="body2">{user.companies[0]?.companyName}</Typography>
              </div>
            )}
            <Menu items={mainItems} />
            <Menu items={bottomItems} />
          </div>
        ) : (
          <LoadingBackdrop loading={user === PENDING} />
        )}
        <ContactPopup open={showModal} onClose={() => setShowModal(false)} />
      </>
    </Page>
  );
});

export const AccountManagementRoutes: RouteObject[] = [
  {
    path: paths.root.account.path,
    element: <AccountManagement />,
  },
];
