import { Suspense, useCallback, useMemo } from 'react';
import { Await, defer, Navigate, RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { BreadcrumbItems } from 'components/Breadcrumbs';
import { useWorkflow } from 'hooks/useWorkflow';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, path, paths, sibling } from 'paths';
import { WorkflowError, WorkflowLayout } from 'screens/shared/Workflow';
import { BusinessDataEntry } from 'screens/BusinessDataEntry';
import { BankAccountEntry } from 'screens/BankAccountEntry';
import { LegalRepresentativesEntry } from 'screens/LegalRepresentativesEntry';
import { BeneficialOwnersEntry } from 'screens/BeneficialOwnersEntry';
import { getKycStatus, getNewCompanyId } from 'state/user';
import { WorkflowStatus } from 'api/types';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { KycSubmitted } from './KycSubmitted';

const phrases = (t: TranslateFn) => ({
  businessDataLabel: t('Business'),
  bankAccountLabel: t('Bank account'),
  legalRepresentativesLabel: t('Legal rep.'),
  beneficialOwnersLabel: t('Beneficial owners'),
  errorNewWorkflow: t('An error occurred when initializing a new kyc workflow.'),
  errorLoadingWorkflow: t('An error occurred loading the KYC workflow.'),
  backToDashboard: t('Back to the payment dashboard'),
  retry: t('Retry'),
});

const KycWorkflowError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <Navigate
      replace
      to={sibling(paths.root.kyc.path, 'error')}
      state={{
        description: translations.errorLoadingWorkflow,
        actionText: translations.backToDashboard,
        to: fromRoot(paths.root.factoring.path),
      }}
    />
  );
};

export const KycWorkflow = (props: { kycStatus: WorkflowStatus }) => {
  const {
    kycStatus: { progress },
  } = props;
  const translations = useTranslatedText(phrases);

  const breadcrumbs = useMemo(
    (): BreadcrumbItems => [
      {
        label: translations.businessDataLabel,
        path: paths.root.kyc.businessData.path,
      },
      {
        label: translations.bankAccountLabel,
        path: paths.root.kyc.bankAccount.path,
      },
      {
        label: translations.legalRepresentativesLabel,
        path: paths.root.kyc.legalRepresentatives.path,
      },
      {
        label: translations.beneficialOwnersLabel,
        path: paths.root.kyc.beneficialOwners.path,
      },
    ],
    [translations]
  );

  const { WorkflowProvider } = useWorkflow({
    breadcrumbs,
    initialProgress: progress,
  });
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(fromRoot(paths.root.factoring.path));
  }, [navigate]);

  return (
    <WorkflowProvider>
      <WorkflowLayout onClose={handleClose} />
    </WorkflowProvider>
  );
};

const KycWorkflowLoader = () => {
  const data = useLoaderData() as { kycStatus: Promise<WorkflowStatus> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<KycWorkflowError />} resolve={data.kycStatus}>
        {(kycStatus: WorkflowStatus) => {
          if (kycStatus.status === 'complete') {
            return <Navigate replace to={fromRoot(paths.root.factoring.path)} />;
          }

          return <KycWorkflow kycStatus={kycStatus} />;
        }}
      </Await>
    </Suspense>
  );
};

const NewKycWorkflowError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <Navigate
      replace
      to="error"
      state={{
        description: translations.errorNewWorkflow,
        actionText: translations.retry,
        to: sibling(paths.root.kyc.path),
      }}
    />
  );
};

const NewKycWorkflowLoader = () => {
  const data = useLoaderData() as { id: Promise<string> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<NewKycWorkflowError />} resolve={data.id}>
        {(id: string) => <Navigate replace to={id} />}
      </Await>
    </Suspense>
  );
};

export const KycWorkflowRoutes: RouteObject[] = [
  {
    path: paths.root.kyc.path,
    element: <NewKycWorkflowLoader />,
    errorElement: <NewKycWorkflowError />,
    loader: () => defer({ id: getNewCompanyId() }),
  },
  {
    path: path(paths.root.kyc.path, 'error'),
    element: <WorkflowError />,
  },
  {
    path: path(paths.root.kyc.path, ':companyId'),
    element: <KycWorkflowLoader />,
    errorElement: <KycWorkflowError />,
    loader: ({ params }) => defer({ kycStatus: getKycStatus(params.companyId!) }),
    children: [
      {
        element: <BusinessDataEntry />,
        path: paths.root.kyc.businessData.path,
        handle: { index: 0, next: paths.root.kyc.bankAccount.path },
      },
      {
        element: <BankAccountEntry />,
        path: paths.root.kyc.bankAccount.path,
        handle: {
          index: 1,
          next: paths.root.kyc.legalRepresentatives.path,
          previous: paths.root.kyc.businessData.path,
        },
      },
      {
        element: <LegalRepresentativesEntry />,
        path: paths.root.kyc.legalRepresentatives.path,
        handle: {
          index: 2,
          next: paths.root.kyc.beneficialOwners.path,
          previous: paths.root.kyc.bankAccount.path,
        },
      },
      {
        element: <BeneficialOwnersEntry />,
        path: paths.root.kyc.beneficialOwners.path,
        handle: {
          index: 3,
          next: paths.root.kyc.kycSubmitted.path,
          previous: paths.root.kyc.legalRepresentatives.path,
        },
      },
    ],
  },
  {
    element: <KycSubmitted />,
    path: path(paths.root.kyc.path, ':companyId', paths.root.kyc.kycSubmitted.path),
  },
];
