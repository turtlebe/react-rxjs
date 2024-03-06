import { memo } from 'react';
import { Navigate, Outlet, RouteObject, useParams } from 'react-router-dom';
import { Page } from 'components/Page';
import { Typography } from 'components/Typography';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, path, paths } from 'paths';
import { useSelectedCompany } from 'state/user';
import { OrderRoutes } from 'screens/OrderPage';
import { OrderCreationRoutes } from 'screens/OrderCreation';
import { CreateCollectiveInvoiceRoute } from 'screens/OrderCreateCollectiveInvoice/OrderCreateCollectiveInvoicePage';
import { CompanyDataMissing } from './CompanyDataMissing';
import { OrderBookMain } from './OrderBookMain';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Order book'),
});

export const OrderBook = memo(() => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();
  const company = useSelectedCompany();
  const params = useParams();
  const orderbookFunctionality = company?.availableFeatures?.find(
    (feature) => feature.functionality === 'ORDER_BOOK'
  );

  if (company?.companyId !== params.companyId) {
    return <Navigate to={fromRoot(paths.root.orders.path)} />;
  }

  return (
    <Page>
      <Typography
        css={(theme) => ({ marginBottom: theme.spacing(3.75) })}
        variant={isMobileView ? 'h2' : 'h1'}
      >
        {translations.titleLabel}
      </Typography>
      {orderbookFunctionality?.status === 'FEATURE_AVAILABLE' ? (
        <OrderBookMain />
      ) : (
        <CompanyDataMissing />
      )}
    </Page>
  );
});

const OrderBookLoader = () => {
  const company = useSelectedCompany();
  return company ? <Navigate replace to={company.companyId} /> : <OrderBook />;
};

export const OrderBookRoutes: RouteObject[] = [
  {
    path: paths.root.orders.path,
    element: <OrderBookLoader />,
  },
  {
    path: path(paths.root.orders.path, ':companyId'),
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <OrderBook />,
      },
      ...OrderCreationRoutes,
      ...OrderRoutes,
      ...CreateCollectiveInvoiceRoute,
    ],
  },
];
