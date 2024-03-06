import React, { ComponentType, forwardRef } from 'react';
import { useAuth0, User, withAuthenticationRequired } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingBackdrop } from '../../components/Backdrop/LoadingBackdrop';

export interface AuthenticatedGuardParameters {
  returnTo: string;
  roles?: string[];
}

const onRedirecting = () => <LoadingBackdrop loading />;
const navigateTo = (returnToPath: string) => forwardRef(() => <Navigate to={returnToPath} />);

function claimCheck(user?: User, roles?: string[]): boolean {
  if (user) {
    if (!roles || roles.length === 0) {
      // If no roles, then we're only checking authentication - no specific roles
      return true;
    }
    const userRoles: string[] = user['https://truck-os.com/v1/roles'];
    if (userRoles) {
      return userRoles.some((role) => roles.includes(role));
    }
  }
  return false;
}

const useClaimCheck = (Component: ComponentType, returnToPath: string, roles?: string[]) => {
  const { user } = useAuth0();

  if (claimCheck(user, roles)) {
    return Component;
  }
  return navigateTo(returnToPath);
};

export const AuthorizedGuard = ({ returnTo, roles }: AuthenticatedGuardParameters) => {
  const AuthorizedOutlet = withAuthenticationRequired(useClaimCheck(Outlet, returnTo, roles), {
    onRedirecting,
    returnTo: () => window.location.pathname,
  });

  return <AuthorizedOutlet />;
};
