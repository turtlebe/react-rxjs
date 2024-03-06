import { memo, Suspense } from 'react';
import { css, Theme } from '@emotion/react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { User } from 'api/types';
import { NotificationCenter } from '../NotificationCenter';
import { ErrorPage } from '../ErrorPage';

const style = (theme: Theme) =>
  css({
    padding: theme.spacing(2.5),

    [theme.breakpoints.down('md')]: {},
  });

export const AdminLayout = memo(() => {
  const data = useLoaderData() as { user: Promise<User> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await
        errorElement={<ErrorPage showError description="Admin Layour Error" />}
        resolve={data.user}
      >
        <div css={style}>
          <Outlet />
          <NotificationCenter />
        </div>
      </Await>
    </Suspense>
  );
});
