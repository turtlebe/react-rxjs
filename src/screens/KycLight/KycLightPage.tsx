import { memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Await,
  defer,
  Navigate,
  RouteObject,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Subscription } from 'rxjs';
import { posthog } from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { Typography } from 'components/Typography';
import { useFormApiConnector } from 'hooks/useFormApiConnector';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { getKycLightFormData, sendKycLightFormData } from 'api/kyc';
import { fromRoot, path, paths, sibling } from 'paths';
import { getNewCompanyId, refreshUser, useSelectedCompany } from 'state/user';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { forceRefreshTokenOnNextRequest } from '../../api/fetch';
import { KycLightForm } from './KycLightForm';
import { KycLightFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Your business data'),
  description: t(
    'We need your business data so we can generate order confirmations and invoices for you.'
  ),
  errorDescription: t('There was an error loading the company data entry page'),
  backToOrderbook: t('Back to the order book'),
});

const KycLightError = () => {
  const translations = useTranslatedText(phrases);
  return (
    <Navigate
      replace
      to={sibling(paths.root.kycLight.path, 'error')}
      state={{
        description: translations.errorDescription,
        actionText: translations.backToOrderbook,
        to: fromRoot(paths.root.orders.path),
      }}
    />
  );
};

export const KycLightPage = memo(() => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subscription = useRef<Subscription>();
  const translations = useTranslatedText(phrases);
  const { companyId } = useParams();

  const getFormValues = useMemo(() => () => getKycLightFormData(companyId!), [companyId]);
  const sendFormValues = useMemo(
    () => (data: KycLightFormValues) => sendKycLightFormData(companyId!, data),
    [companyId]
  );

  const { initialValues } = useFormApiConnector('kyc-light', getFormValues, sendFormValues);

  const handleSubmit = useCallback(
    async (data: KycLightFormValues) => {
      setIsSubmitting(true);
      if (data) {
        subscription.current = sendKycLightFormData(companyId!, data).subscribe((result) => {
          if (result) {
            forceRefreshTokenOnNextRequest();
            refreshUser(true);
            navigate(fromRoot(path(paths.root.orders.path), companyId!));
            posthog.capture('KYClight completed or updated', {
              companyName: data.companyName,
              countryCode: data.country,
              city: data.city,
              postcode: data.postcode,
              email: data.email,
              vatId: data.vatId,
            });
          } else {
            setIsSubmitting(false);
          }
        });
      } else {
        setIsSubmitting(false);
      }
    },
    [companyId, navigate]
  );

  useEffect(
    () => () => {
      if (subscription.current && !subscription.current.closed) {
        subscription.current.unsubscribe();
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ForestHeaderPage title={translations.title} onClose={handleClose}>
      <div>
        <Typography css={(theme) => ({ paddingBottom: theme.spacing(2.5) })} variant="body1">
          {translations.description}
        </Typography>
        <KycLightForm
          initialValues={initialValues}
          loading={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>
    </ForestHeaderPage>
  );
});

const KycLightLoader = () => {
  const company = useSelectedCompany();
  const orderbookFunctionality = company?.availableFeatures?.find(
    (feature) => feature.functionality === 'ORDER_BOOK'
  );
  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<KycLightError />} resolve={orderbookFunctionality}>
        {() => <KycLightPage />}
      </Await>
    </Suspense>
  );
};

const NewCompanyLoader = () => {
  const data = useLoaderData() as { id: Promise<string> };
  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<KycLightError />} resolve={data.id}>
        {(id: string) => <Navigate replace to={id} />}
      </Await>
    </Suspense>
  );
};

export const KycLightRoute: RouteObject[] = [
  {
    path: paths.root.kycLight.path,
    element: <NewCompanyLoader />,
    errorElement: <KycLightError />,
    loader: () => defer({ id: getNewCompanyId() }),
  },
  {
    path: path(paths.root.kycLight.path, 'error'),
    element: <KycLightError />,
  },
  {
    path: path(paths.root.kycLight.path, ':companyId'),
    element: <KycLightLoader />,
    errorElement: <KycLightError />,
  },
];
