import { memo, Suspense, useEffect } from 'react';
import { css, Theme } from '@emotion/react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavBarMobile } from 'components/NavBarMobile';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { User } from 'api/types';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { identifySafely } from 'providers/PosthogClient';
import { NotificationCenter } from '../NotificationCenter';
import { ErrorPage } from '../ErrorPage';
import { TranslateFn, useTranslatedText } from '../../hooks/useTranslatedText';
import { SideNavBar } from './SideNavBar';
import { useUser } from 'state/user';
import { PENDING } from 'state';

const style = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateAreas: `'side main'`,
    gridTemplateRows: '1fr',
    gridTemplateColumns: 'auto 1fr',
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      top: 0,
      left: 0,
      gridTemplateAreas: `'main'
                        'footer'`,
      gridTemplateRows: `1fr ${theme.spacing(8)}`,
      gridTemplateColumns: '1fr',
    },
  });

const mainStyle = css({
  gridArea: 'main',
  overflow: 'auto',
  position: 'relative',
});

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Application Error'),
});

export const AppLayout = memo(() => {
  const isMobileView = useIsMobileView();
  const data = useLoaderData() as { user: Promise<User> };
  const user = useUser();
  const translations = useTranslatedText(phrases);
  const { i18n } = useTranslation();

  useEffect(() => {
    const identifyUser = async () => {
      try {
        const user = await data.user;
        identifySafely(user);
      } catch (error) {
        /* empty */
      }
    };
    identifyUser();
  }, [user]);

  useEffect(() => {
    // CTFU: source changed locale from the user for now. In future unify place where we source it from
    // either from the useLoaderData promise or from a getCurrentUser() or just useUser()
    const changeLocaleForUser = async () => {
      if (user !== PENDING) {
        if (user.locale && i18n.language !== user.locale) {
          i18n.changeLanguage(user.locale)
        }
      }
    };
    changeLocaleForUser();
  }, [i18n, user]);

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await
        errorElement={<ErrorPage showError description={translations.titleLabel} />}
        resolve={data.user}
      >
        {(user: User) => (
          <div css={style}>
            {!isMobileView && <SideNavBar css={{ gridArea: 'side' }} user={user} />}
            <div css={mainStyle}>
              <Outlet />
            </div>
            {isMobileView && <NavBarMobile css={{ gridArea: 'footer' }} />}
            <NotificationCenter />
          </div>
        )}
      </Await>
    </Suspense>
  );
});
