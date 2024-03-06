import { memo, Suspense, useCallback, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { css } from '@emotion/react';
import { Await, defer, RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { Menu } from 'components/Menu';
import { BackButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { BusinessDataFormValues } from 'screens/BusinessDataEntry/types';
import { fromRoot, path, paths, sibling } from 'paths';
import { ContactPopup } from 'screens/shared/ContactPopup';
import { AccountCompany } from 'api/types';
import { ErrorPage } from 'screens/ErrorPage';
import { getCompanyDetails } from 'state/user';
import { ArrowRight } from 'theme/icons';
import { BusinessInformation } from './BusinessInformation';
import { BankAccount, BankAccountDetails } from './BankAccount';
import { ContactData } from './ContactData';

export interface AccountDetailsProps {
  bankAccount: BankAccountDetails;
  businessInfo: BusinessDataFormValues;
}

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Company details'),
  descriptionLabelNotVerified: t(
    'Please <underline>complete your verification</underline> so you can start factoring.'
  ),
  descriptionLabel: t(
    'To add or change your business data, <underline>please click here</underline>.'
  ),
  errorDescription: t('There was an error loading the company account details'),
  backButtonLabel: t('Back'),
  businessInformation: t('Business information'),
  bankAccount: t('Bank data'),
  contactData: t('Contact data'),
  yourCompanyLogo: t('Your company logo'),
});

const linkStyle = css({
  textDecoration: 'underline',
  display: 'inline-block',
  cursor: 'pointer',
});

const AccountDetailsMenu = (props: { details: AccountCompany }) => {
  const { details } = props;
  const translations = useTranslatedText(phrases);

  const businessData = useMemo(
    () => ({
      companyName: details.companyName,
      legalForm: details.details?.legalForm,
      streetAndNumber: details.details?.address?.streetAndNumber,
      postcode: details.details?.address?.postcode,
      city: details.details?.address?.city,
      taxId: details.details?.taxId,
      vatId: details.details?.vatId,
    }),
    [details.companyName, details.details]
  );

  const bankAccount = useMemo(
    () => ({
      ...details.accountCompanyBankDetails,
    }),
    [details]
  );

  const contactData = useMemo(
    () => ({
      ...details.accountCompanyContacts?.filter((contact) =>
        contact.includeIn?.includes('outgoingBookkeeping')
      )[0]?.contactDetails,
    }),
    [details]
  );

  const menuItems = useMemo(
    () => [
      {
        text: translations.businessInformation,
        borderBottom: true,
        details: businessData && <BusinessInformation {...businessData} />,
      },
      {
        text: translations.contactData,
        borderBottom: true,
        details: contactData && <ContactData {...contactData} />,
      },
      {
        text: translations.bankAccount,
        borderBottom: true,
        details: bankAccount && <BankAccount {...bankAccount} />,
      },
    ],
    [translations, bankAccount, businessData, contactData]
  );

  return <Menu items={menuItems} />;
};

const AccountDetailsBottomMenu = () => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();

  const menuItems = useMemo(
    () => [
      {
        text: translations.yourCompanyLogo,
        rightIcon: <ArrowRight />,
        onClickItem: () => {
          navigate(sibling(paths.root.account.uploadLogo.path));
        },
      },
    ],
    [navigate, translations]
  );

  return <Menu items={menuItems} />;
};

export const AccountDetails = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const isMobileView = useIsMobileView();
  const [showModal, setShowModal] = useState(false);
  const data = useLoaderData() as { details: Promise<AccountCompany | null> };

  const handleNavigateToKycLight = useCallback(
    (companyId: string) => {
      if (companyId) {
        navigate(fromRoot(path(paths.root.kycLight.path, companyId)));
      } else {
        navigate(fromRoot(paths.root.kycLight.path));
      }
    },
    [navigate]
  );

  return (
    <Page header={<BackButton label={translations.backButtonLabel} onClick={() => navigate(-1)} />}>
      <Typography
        variant={isMobileView ? 'h2' : 'h1'}
        css={(theme) => ({
          margin: theme.spacing(1.25, 0),
        })}
      >
        {translations.titleLabel}
      </Typography>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await
          errorElement={<ErrorPage description={translations.errorDescription} />}
          resolve={data.details}
        >
          {(details: AccountCompany) => (
            <div
              css={(theme) => ({
                gap: theme.spacing(3.75),
                paddingBottom: theme.spacing(3.75),
                display: 'flex',
                flexDirection: 'column',
              })}
            >
              <Typography variant={isMobileView ? 'body2' : 'body1'}>
                <Trans
                  i18nKey={translations.descriptionLabel}
                  components={{
                    underline: (
                      <Typography
                        css={linkStyle}
                        onClick={() => handleNavigateToKycLight(details?.companyId)}
                      />
                    ),
                  }}
                />
              </Typography>
              {details && <AccountDetailsMenu details={details} />}
              <AccountDetailsBottomMenu />
              <ContactPopup open={showModal} onClose={() => setShowModal(false)} />
            </div>
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
    loader: () => defer({ details: getCompanyDetails() }),
  },
];
