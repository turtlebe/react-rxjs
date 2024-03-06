import React, { memo, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { posthogLogoutSafely } from 'providers/PosthogClient';
import { LoadingBackdrop } from '../../components/Backdrop/LoadingBackdrop';

export const Logout = memo(() => {
  const { logout } = useAuth0();

  useEffect(() => {
    async function doLogout(): Promise<void> {
      posthogLogoutSafely();
      logout({
        clientId: window.config.AUTH0_CLIENT_ID,
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }

    doLogout();
  }, [logout]);

  return <LoadingBackdrop loading />;
});
