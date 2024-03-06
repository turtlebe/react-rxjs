import { memo, useCallback, useMemo, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { firstValueFrom } from 'rxjs';
import { BackButton } from 'components/Button';
import { Menu } from 'components/Menu';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PENDING } from 'state';
import { refreshUser, useUser } from 'state/user';
import { DeDEFlag } from 'theme/icons/locales/de-DE';
import { EnUSFlag } from 'theme/icons/locales/en-US';
import { Check } from 'theme/icons';
import { MenuItemProps } from 'components/Menu/MenuItem';
import { paths } from 'paths';
import { updateUserData } from 'api/user';
import { Locale } from 'theme/icons/locales';
import { forceRefreshTokenOnNextRequest } from 'api/fetch';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Language settings'),
  backButtonLabel: t('Back'),
  english: t('English (US)'),
  german: t('German'),
});

export const LanguageSettings = memo(() => {
  const user = useUser();
  const isMobileView = useIsMobileView();
  const navigate = useNavigate();
  const translations = useTranslatedText(phrases);
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = useCallback(
    async (language: Locale) => {
      if (i18n.language === language) {
        return;
      }
      setIsLoading(true);
      if (user !== PENDING) {
        const userWithLocale = {
          ...user,
          locale: language,
        };
        const result = await firstValueFrom(updateUserData(userWithLocale));
        if (result) {
          forceRefreshTokenOnNextRequest();
          refreshUser(true);
        }
      }
    },
    [i18n, user]
  );

  const menuItems: MenuItemProps[] = useMemo(
    () => [
      {
        leftIcon: <DeDEFlag />,
        rightIcon: i18n.language === 'de-DE' ? <Check /> : undefined,
        text: translations.german,
        textColor: i18n.language === 'de-DE' ? 'primary' : 'secondary',
        borderBottom: true,
        onClickItem: () => changeLanguage('de-DE'),
      },
      {
        leftIcon: <EnUSFlag />,
        text: translations.english,
        textColor: i18n.language === 'en-US' ? 'primary' : 'secondary',
        rightIcon: i18n.language === 'en-US' ? <Check /> : undefined,
        onClickItem: () => changeLanguage('en-US'),
      },
    ],
    [i18n.language, changeLanguage, translations]
  );

  return (
    <Page>
      {user !== PENDING ? (
        <>
          <div>
            <BackButton label={translations.backButtonLabel} onClick={() => navigate(-1)} />
            <Typography
              css={(theme) => ({ margin: theme.spacing(1.25, 0, 3.75) })}
              variant={isMobileView ? 'h2' : 'h1'}
            >
              {translations.titleLabel}
            </Typography>
            <Menu items={menuItems} />
          </div>
          {isLoading && <LoadingBackdrop loading={isLoading} />}
        </>
      ) : (
        <LoadingBackdrop loading={user === PENDING} />
      )}
    </Page>
  );
});

export const LanguageSettingsRoute: RouteObject[] = [
  {
    path: paths.root.account.languageSettings.path,
    element: <LanguageSettings />,
  },
];
