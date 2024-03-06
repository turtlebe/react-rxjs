import React, { ReactElement, useCallback } from 'react';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export interface Auth0ProviderWithNavigateProps {
  children: ReactElement;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate();

  const domain = window.config.AUTH0_DOMAIN;
  const clientId = window.config.AUTH0_CLIENT_ID;
  const audience = window.config.AUTH0_AUDIENCE;
  const redirectUri = window.location.origin;

  const onRedirectCallback = useCallback(
    (appState?: AppState) => {
      navigate(appState?.returnTo || window.location.pathname);
    },
    [navigate]
  );

  return (
    <Auth0Provider
      useRefreshTokens
      authorizationParams={{ audience, redirect_uri: redirectUri }}
      clientId={clientId}
      domain={domain}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
