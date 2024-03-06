import { ReactElement, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAccessTokenFactory } from 'api/fetch';
import { refreshUser } from '../../state/user';
import { LoadingBackdrop } from '../../components/Backdrop/LoadingBackdrop';

export interface AuthStateProviderProps {
  children: ReactElement;
}

export const AuthStateProvider = ({ children }: AuthStateProviderProps) => {
  const auth = useAuth0();

  useEffect(() => {
    setAccessTokenFactory((forceRefresh: boolean) => {
      if (forceRefresh) {
        return auth.getAccessTokenSilently({ cacheMode: 'off' });
      }
      return auth.getAccessTokenSilently();
    });
  }, [auth, auth.getAccessTokenSilently]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      refreshUser(auth.isAuthenticated);
    }
  }, [auth]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return auth.isLoading ? <LoadingBackdrop loading /> : children;
};
