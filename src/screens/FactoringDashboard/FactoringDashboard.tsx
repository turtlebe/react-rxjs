import { memo } from 'react';
import { Navigate, Outlet, RouteObject, useParams } from 'react-router-dom';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, path, paths } from 'paths';
import { useSelectedCompany } from 'state/user';
import { PaymentsWorkflowRoutes } from 'screens/PaymentsWorkflow';
import { PaymentRoutes } from 'screens/PaymentRequestPage';
import { FactoringNotVerified } from './FactoringNotVerified';
import { FactoringMain } from './FactoringMain';
import { FactoringKycPending } from './FactoringKycPending';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Factoring Dashboard'),
});

export const FactoringDashboard = memo(() => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();
  const company = useSelectedCompany();
  const params = useParams();
  const factoringWalbingFunctionality = company?.availableFeatures?.find(
    (feature) => feature.functionality === 'FACTORING_WALBING'
  );

  if (company?.companyId !== params.companyId) {
    return <Navigate to={fromRoot(paths.root.factoring.path)} />;
  }

  return (
    <Page>
      <Typography
        css={(theme) => ({ marginBottom: theme.spacing(3.75) })}
        variant={isMobileView ? 'h2' : 'h1'}
      >
        {translations.titleLabel}
      </Typography>
      {factoringWalbingFunctionality?.status === 'FEATURE_AVAILABLE' ? (
        <FactoringMain />
      ) : factoringWalbingFunctionality?.status === 'VERIFICATION_IN_PROGRESS' ? (
        <FactoringKycPending />
      ) : (
        <FactoringNotVerified />
      )}
    </Page>
  );
});

const FactoringDashboardLoader = () => {
  const company = useSelectedCompany();
  return company ? <Navigate replace to={company.companyId} /> : <FactoringDashboard />;
};

export const FactoringDashboardRoutes: RouteObject[] = [
  {
    path: paths.root.factoring.path,
    element: <FactoringDashboardLoader />,
  },
  {
    path: path(paths.root.factoring.path, ':companyId'),
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <FactoringDashboard />,
      },
      ...PaymentsWorkflowRoutes,
      ...PaymentRoutes,
    ],
  },
];
