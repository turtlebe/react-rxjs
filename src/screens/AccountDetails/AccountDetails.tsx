import { memo, Suspense, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { css, Theme } from '@emotion/react';
import { Await, defer, RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { Menu } from 'components/Menu';
import { BackButton, Button } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { getAccountDetails } from 'state/user';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { BusinessDataFormValues } from 'screens/BusinessDataEntry/types';
import { paths, sibling } from 'paths';
import { ContactPopup } from 'screens/shared/ContactPopup';
import { CompanyAccountDetails } from 'api/types';
import { ErrorPage } from 'screens/ErrorPage';
import { BusinessInformation } from './BusinessInformation';
import { BankAccount, BankAccountDetails } from './BankAccount';
import { VirtualIban, VirtualIbanProps } from './VirtualIban';
import { VerificationStatus, VerificationStatusProps } from './VerificationStatus';
import { LegalRepresentatives, TLegalRepresentative } from './LegalRepresentatives';
import { BeneficialOwners, TBeneficialOwner } from './BeneficialOwners';

export interface AccountDetailsProps {
  bankAccount: BankAccountDetails;
  beneficialOwners: TBeneficialOwner[];
  businessInfo: BusinessDataFormValues;
  legalRepresentatives: TLegalRepresentative[];
  verificationStatus: VerificationStatusProps;
  virtualIban: VirtualIbanProps;
}

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Account & company details'),
  descriptionLabelNotVerified: t(
    'Please <underline>complete your verification</underline> so you can start factoring.'
  ),
  descriptionKycInProgressLabel: t(
    'We are checking your data and you should be able to start factoring soon.'
  ),
  descriptionLabel: t(
    'To change your business data, please <underline>contact the truckOS support team</underline>.'
  ),
  errorDescription: t('There was an error loading the company account details'),
  backButtonLabel: t('Back'),
  businessInformation: t('Business information'),
  bankAccount: t('Bank account'),
  virtualIban: t('Virtual IBAN - for your invoices'),
  verificationStatus: t('Verification status'),
  legalRepresentatives: t('Legal representatives'),
  beneficialOwners: t('Beneficial owners'),
  completeVerificationNow: t('Complete verification now'),
});

const linkStyle = (verifyLink: boolean) => (theme: Theme) =>
  css({
    color: verifyLink ? theme.palette.primary.main : 'currentColor',
    textDecoration: 'underline',
    display: 'inline-block',
    cursor: 'pointer',
  });

const AccountDetailsMenu = (props: { details: CompanyAccountDetails }) => {
  const {
    details: {
      bankAccount,
      beneficialOwners,
      businessData,
      kycStatus,
      legalRepresentatives,
      virtualIban,
    },
  } = props;
  const translations = useTranslatedText(phrases);

  const menuItems = useMemo(
    () => [
      {
        text: translations.businessInformation,
        borderBottom: true,
        details: businessData && <BusinessInformation {...businessData} />,
      },
      {
        text: translations.bankAccount,
        borderBottom: true,
        details: bankAccount && <BankAccount {...bankAccount} />,
      },
      {
        text: translations.virtualIban,
        borderBottom: true,
        details: <VirtualIban {...virtualIban} kycStatus={kycStatus} />,
      },
      {
        text: translations.verificationStatus,
        borderBottom: true,
        details: <VerificationStatus kycStatus={kycStatus} />,
      },
      {
        text: translations.legalRepresentatives,
        borderBottom: true,
        details: legalRepresentatives?.representatives && (
          <LegalRepresentatives representatives={legalRepresentatives?.representatives} />
        ),
      },
      {
        text: translations.beneficialOwners,
        details: beneficialOwners && <BeneficialOwners {...beneficialOwners} />,
      },
    ],
    [
      translations,
      bankAccount,
      beneficialOwners,
      businessData,
      virtualIban,
      kycStatus,
      legalRepresentatives,
    ]
  );

  return <Menu items={menuItems} />;
};

export const AccountDetails = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const isMobileView = useIsMobileView();
  const [showModal, setShowModal] = useState(false);
  const data = useLoaderData() as { details: Promise<CompanyAccountDetails | null> };

  return (
    <Page header={<BackButton label={translations.backButtonLabel} onClick={() => navigate(-1)} />}>
      <Typography
        css={(theme) => ({ margin: theme.spacing(1.25, 0) })}
        variant={isMobileView ? 'h2' : 'h1'}
      >
        {translations.titleLabel}
      </Typography>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await
          errorElement={<ErrorPage description={translations.errorDescription} />}
          resolve={data.details}
        >
          {(details: CompanyAccountDetails | null) => (
            <>
              <Typography
                css={(theme) => ({ marginBottom: theme.spacing(3.75) })}
                variant={isMobileView ? 'body2' : 'body1'}
              >
                {details?.kycStatus === 'complete' ? (
                  <Trans
                    i18nKey={translations.descriptionLabel}
                    components={{
                      underline: (
                        <Typography css={linkStyle(false)} onClick={() => setShowModal(true)} />
                      ),
                    }}
                  />
                ) : details?.kycStatus === 'in_progress' ? (
                  translations.descriptionKycInProgressLabel
                ) : (
                  <Trans
                    i18nKey={translations.descriptionLabelNotVerified}
                    components={{
                      underline: (
                        <Typography
                          css={linkStyle(true)}
                          onClick={() => navigate(sibling(paths.root.kyc.path))}
                        />
                      ),
                    }}
                  />
                )}
              </Typography>
              {details ? (
                <AccountDetailsMenu details={details} />
              ) : (
                <Button
                  onClick={() => {
                    navigate(sibling(paths.root.kyc.path));
                  }}
                >
                  {translations.completeVerificationNow}
                </Button>
              )}
              <ContactPopup open={showModal} onClose={() => setShowModal(false)} />
            </>
          )}
        </Await>
      </Suspense>
    </Page>
  );
});

export const AccountDetailsRoute: RouteObject[] = [
  {
    path: paths.root.account.details.path,
    element: <AccountDetails />,
    loader: () => defer({ details: getAccountDetails() }),
  },
];
