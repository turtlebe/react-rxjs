import { memo, Suspense } from 'react';
import { css, Theme } from '@emotion/react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import { Card } from 'components/Card';
import { Logo } from 'components/Logo';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import BackgroundImg from 'assets/background.png';
import colors from 'theme/colors';
import { fromRoot, paths } from '../../paths';
import { User } from '../../api/types';
import { LoadingBackdrop } from '../../components/Backdrop/LoadingBackdrop';
import { ErrorPage } from '../ErrorPage';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Thank you for your interest in truckOS!'),
  descriptionLabel: t(
    'We are currently in invite-only mode. We will review your registration and we will shortly be in touch with you!'
  ),
});

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
    height: theme.spacing(62.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: `0px 0px ${theme.spacing(3.75)} 0px ${colors.Midnight}10`,
    padding: theme.spacing(6.75),
    [theme.breakpoints.down('md')]: {
      height: '100vh',
      width: '100%',
      padding: theme.spacing(6.75, 5.5),
    },
  });

const logoStyle = (theme: Theme) =>
  css({
    width: theme.spacing(31.25),
    height: theme.spacing(5.5),
    marginBottom: theme.spacing(12.5),
  });

const ResolvedComponent = (props: { user: User }) => {
  const { user } = props;
  const translations = useTranslatedText(phrases);

  switch (user.profileStatus) {
    case 'INCOMPLETE':
      return <Navigate to={fromRoot(paths.root.registration.path)} />;
    case 'COMPLETE':
    default:
      break;
  }

  return (
    <div css={bgStyle}>
      <Card css={wrapperStyle}>
        <Logo css={logoStyle} />
        <Typography variant="h2">{translations.titleLabel}</Typography>
        <Typography
          variant="body1"
          css={(theme) => ({
            marginTop: theme.spacing(2.5),
            color: theme.palette.text.secondary,
          })}
        >
          {translations.descriptionLabel}
        </Typography>
      </Card>
    </div>
  );
};

export const Wall = memo(() => {
  const translations = useTranslatedText(phrases);
  const data = useLoaderData() as { user: Promise<User> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await
        errorElement={<ErrorPage showError description={translations.titleLabel} />}
        resolve={data.user}
      >
        {(user: User) => <ResolvedComponent user={user} />}
      </Await>
    </Suspense>
  );
});
