import { Outlet } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderWithNavigate';
import { AuthStateProvider } from './auth/AuthStateProvider';

export const RuntimeContextProvider = () => (
  <Auth0ProviderWithNavigate>
    <AuthStateProvider>
      <Outlet />
    </AuthStateProvider>
  </Auth0ProviderWithNavigate>
);
