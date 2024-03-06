import { memo, Suspense } from 'react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import { fromRoot, paths } from '../paths';
import { User } from '../api/types';
import { LoadingBackdrop } from '../components/Backdrop/LoadingBackdrop';
import { TranslateFn, useTranslatedText } from '../hooks/useTranslatedText';
import { ErrorPage } from './ErrorPage';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Home'),
});
const ResolvedComponent = (props: { user: User }) => {
  const { user } = props;
  switch (user.profileStatus) {
    case 'COMPLETE':
      return <Navigate to={fromRoot(paths.root.orders.path)} />;
    case 'INCOMPLETE':
    default:
      return <Navigate to={fromRoot(paths.root.registration.path)} />;
  }
};

export const HomePath = memo(() => {
  const data = useLoaderData() as { user: Promise<User> };
  const translations = useTranslatedText(phrases);

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
