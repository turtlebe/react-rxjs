import { memo, Suspense, useCallback, useEffect, useState } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { css, Theme } from '@emotion/react';
import { Trans, useTranslation } from 'react-i18next';
import { firstValueFrom } from 'rxjs';
import posthog from 'posthog-js';
import { BackButton } from 'components/Button';
import { Logo } from 'components/Logo';
import { Card } from 'components/Card';
import { LocaleSelect } from 'components/Select';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { refreshUser, useUser } from 'state/user';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { fromRoot, paths } from 'paths';
import BackgroundImg from 'assets/background.png';
import colors from 'theme/colors';
import { Locale } from 'theme/icons/locales';
import { FirstNameFormField, LastNameFormField } from 'screens/shared/FormFields';
import { updateUserData } from 'api/user';
import { TruckOsPrivacyPolicyUrl } from 'ref-data/misc';
import { User, UserProfile } from 'api/types';
import { PENDING } from 'state';
import { ErrorPage } from '../ErrorPage';
import { useRegistrationSchema } from './useRegistrationSchema';

const phrases = (t: TranslateFn) => ({
  backButtonLabel: t('Back to Sign in'),
  titleLabel: t('Account creation'),
  descriptionLabel: t('Welcome to truckOS. Please tell us a bit about yourself:'),
  submitLabel: t('Create account'),
  privacyPolicy: t(
    "When clicking on 'Create account' you accept the <underline>truckOS privacy policy</underline>."
  ),
});

const DEFAULT_VALUES: UserProfile = {
  firstName: '',
  lastName: '',
  locale: 'de-DE',
};

const bgStyle = css({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${BackgroundImg})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  inset: 0,
});

const wrapperStyle = (theme: Theme) =>
  css({
    position: 'relative',
    width: theme.spacing(52.5),
    height: theme.spacing(81.5),
    boxShadow: `0px 0px ${theme.spacing(3.75)} 0px ${colors.Midnight}10`,
    padding: theme.spacing(3.75),
    [theme.breakpoints.down('md')]: {
      height: '100vh',
      width: '100%',
    },
  });

const logoWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(7.5),
  });

const logoStyle = (theme: Theme) =>
  css({
    width: theme.spacing(18),
    height: theme.spacing(3.125),
  });

const formStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(7.5, 0),
  });

const linkStyle = (theme: Theme) =>
  css({
    color: 'currentColor',
    textDecoration: 'underline',
    display: 'inline',
    textAlign: 'center',
    fontSize: theme.typography.caption.fontSize,
    cursor: 'pointer',
  });

const ResolvedComponent = () => {
  const navigate = useNavigate();
  const translations = useTranslatedText(phrases);
  const { i18n } = useTranslation();
  const schema = useRegistrationSchema();
  const [isLoading, setLoading] = useState(false);
  const updatedUser = useUser();
  const submitData = useCallback(async (data: UserProfile) => {
    setLoading(true);
    const result = await firstValueFrom(updateUserData(data));
    if (result) {
      refreshUser(true);
      posthog.capture('Account created', {
        firstName: data.firstName,
        lastName: data.lastName,
        tbd: data.email,
      });
    } else {
      setLoading(false);
    }
    return result;
  }, []);

  const api = useForm<UserProfile>({
    defaultValues: DEFAULT_VALUES,
    schema,
  });

  useEffect(() => {
    api.setValue('locale', i18n.language as Locale);
  }, [api, i18n.language]);

  useEffect(() => {
    if (updatedUser && updatedUser !== PENDING && updatedUser.profileStatus === 'COMPLETE') {
      setLoading(false);
      navigate(fromRoot(paths.root.orders.path));
    }
  }, [updatedUser, navigate]);

  return (
    <div css={bgStyle}>
      <Card css={wrapperStyle}>
        <BackButton
          css={(theme) => ({ margin: theme.spacing(0, 2.5) })}
          label={translations.backButtonLabel}
          onClick={() => navigate(fromRoot(paths.root.logout.path))}
        />
        <div css={(theme) => ({ padding: theme.spacing(3.75, 2.5) })}>
          <div css={logoWrapperStyle}>
            <Logo css={logoStyle} />
            <LocaleSelect value={i18n.language as Locale} onChange={i18n.changeLanguage} />
          </div>
          <Typography css={(theme) => ({ marginBottom: theme.spacing(2) })} variant="h2">
            {translations.titleLabel}
          </Typography>
          <Typography css={(theme) => ({ color: theme.palette.text.secondary })} variant="body1">
            {translations.descriptionLabel}
          </Typography>
          <Form
            api={api}
            css={formStyle}
            loading={isLoading}
            submitLabel={translations.submitLabel}
            onSubmit={submitData}
          >
            <FirstNameFormField fullWidth />
            <LastNameFormField fullWidth />
          </Form>
          <div
            css={(theme) => ({
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              marginTop: theme.spacing(1.5),
              color: theme.palette.text.secondary,
            })}
          >
            <Typography css={{ textAlign: 'center', width: '100%' }} variant="caption">
              <Trans
                i18nKey={translations.privacyPolicy}
                components={{
                  underline: (
                    <Typography
                      css={linkStyle}
                      onClick={() => window.open(TruckOsPrivacyPolicyUrl, '_blank')}
                    />
                  ),
                }}
              />
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};
export const Registration = memo(() => {
  const data = useLoaderData() as { user: Promise<User> };
  const translations = useTranslatedText(phrases);

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await
        errorElement={<ErrorPage showError description={translations.titleLabel} />}
        resolve={data.user}
      >
        <ResolvedComponent />
      </Await>
    </Suspense>
  );
});
