import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  defer,
  Navigate,
} from 'react-router-dom';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { path, pathBase, paths } from 'paths';
import { AppLayout } from 'screens/AppLayout';
import { OrderBookRoutes } from 'screens/OrderBook';
import { FactoringDashboardRoutes } from 'screens/FactoringDashboard';
import { getCurrentUser } from 'state/user';
import { PaymentsWorkflowRoutes } from 'screens/PaymentsWorkflow';
import { AccountManagementRoutes } from 'screens/AccountManagement';
import { PaymentRoutes } from 'screens/PaymentRequestPage';
import { KycWorkflowRoutes } from 'screens/KycWorkflow';
import { AccountDetailsRoute } from 'screens/AccountDetails';
import { TermsAndConditionsRoute } from 'screens/TermsAndConditions';
import { LanguageSettingsRoute } from 'screens/LanguageSettings';
import { Registration } from 'screens/Registration';
import { SupportAccountRoute } from 'screens/admin/SupportAccount';
import { AdminError, AdminLayout } from 'screens/admin';
import { Wall } from 'screens/Wall';
import { KycLightRoute } from 'screens/KycLight';
import { posthogClientInit } from 'providers/PosthogClient';
import { AccountCompanyLogoUploadRoute } from 'screens/AccountCompanyLogoUpload';
import { AuthorizedGuard } from './providers/auth';
import { Logout } from './screens/Logout';
import { RuntimeContextProvider } from './providers/RuntimeContextProvider';
import { HomePath } from './screens/HomePath';

export const AppRoutes: RouteObject[] = [
  {
    path: pathBase(paths.root.path),
    element: <AppLayout />,
    loader: () => defer({ user: getCurrentUser() }),
    children: [
      ...KycWorkflowRoutes,
      ...OrderBookRoutes,
      ...KycLightRoute,
      ...FactoringDashboardRoutes,
      ...PaymentsWorkflowRoutes,
      ...AccountManagementRoutes,
      ...AccountDetailsRoute,
      ...AccountCompanyLogoUploadRoute,
      ...PaymentRoutes,
      ...TermsAndConditionsRoute,
      ...LanguageSettingsRoute,
    ],
  },
];

export const AdminRoutes: RouteObject[] = [
  {
    path: pathBase(paths.root.path),
    element: <AdminLayout />,
    loader: () => defer({ user: getCurrentUser() }),
    children: [
      ...SupportAccountRoute,
      {
        path: path(paths.root.admin.path, 'error'),
        element: <AdminError />,
      },
    ],
  },
];

export const baseRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePath />,
    loader: () => defer({ user: getCurrentUser() }),
  },
  {
    path: paths.root.registration.path,
    element: <Registration />,
    loader: () => defer({ user: getCurrentUser() }),
  },
  {
    path: paths.root.wall.path,
    element: <Wall />,
    loader: () => defer({ user: getCurrentUser() }),
  },
];

const RuntimeRoutes: RouteObject[] = [
  {
    element: <RuntimeContextProvider />,
    children: [
      {
        element: <Logout />,
        path: paths.root.logout.path,
      },
      {
        // To get past this guard, you only need to be authenticated.
        element: <AuthorizedGuard returnTo={paths.root.path} />,
        children: [
          ...baseRoutes,
          {
            /*
             To get past this guard, you need to be a customer or a support agent.
             If you're neither, you're routed to the wall, where if you're not registered
             it should route you to registration.
             */
            element: (
              <AuthorizedGuard
                returnTo={paths.root.wall.path}
                roles={['Customer', 'Support Agent']}
              />
            ),
            children: AppRoutes,
          },
          {
            /*
             To get past this guard, you need to be a support agent.
             If you're not, you're routed to home
             */
            element: <AuthorizedGuard returnTo={paths.root.path} roles={['Support Agent']} />,
            children: AdminRoutes,
          },
        ],
      },
    ],
  },
];

export default () => {
  /**
   * It's important that the noMatchRoute be the last. Adding it like this means that:
   *     1. It's guaranteed to be at the end/last no matter what.
   *     2. We only add it on PROD-like setups but can have proper errors in the other environments for mismatched routes.
   */
  if (import.meta.env.PROD) {
    RuntimeRoutes.push({
      path: paths.root.noMatchRoute.path,
      element: <Navigate to={paths.root.path} />,
    });
  }

  const router = createBrowserRouter(RuntimeRoutes);

  // Initiate Posthog
  useEffect(() => {
    posthogClientInit();
  }, []);

  // Track page views in posthog
  useEffect(() => {
    const handleRouteChange = () => posthog.capture('$pageview');
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <RouterProvider router={router} />
    </PostHogProvider>
  );
};
