import { memo, Suspense, useCallback } from 'react';
import { Await, defer, RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { paths } from 'paths';
import { ErrorPage } from 'screens/ErrorPage';
import { getPreviousCompanies } from 'state/customers';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { CompanySummary } from 'api/types';
import { OrderCreateCollectiveInvoiceForm } from './OrderCreateCollectiveInvoiceForm';

const phrases = (t: TranslateFn) => ({
  title: t('Create collective invoice'),
  errorLoadingCustomerCompany: t('An error occurred loading the customer company data.'),
});

const OrderCreateCollectiveInvoiceError = () => {
  const translations = useTranslatedText(phrases);

  return <ErrorPage description={translations.errorLoadingCustomerCompany} />;
};

export const OrderCreateCollectiveInvoicePage = memo(() => {
  const navigate = useNavigate();
  const translations = useTranslatedText(phrases);
  const handleSubmit = useCallback(() => {}, []);
  const data = useLoaderData() as { prevCompanies: Promise<CompanySummary[]> };

  return (
    <Suspense fallback={<LoadingBackdrop loading />}>
      <Await errorElement={<OrderCreateCollectiveInvoiceError />} resolve={data.prevCompanies}>
        {(prevCompanies: CompanySummary[]) => (
          <ForestHeaderPage title={translations.title} onClose={() => navigate(-1)}>
            <OrderCreateCollectiveInvoiceForm
              prevCompanies={prevCompanies}
              onSubmit={handleSubmit}
            />
          </ForestHeaderPage>
        )}
      </Await>
    </Suspense>
  );
});

export const CreateCollectiveInvoiceRoute: RouteObject[] = [
  {
    path: paths.root.orders.invoice.createCollectiveInvoice.path,
    element: <OrderCreateCollectiveInvoicePage />,
    errorElement: <OrderCreateCollectiveInvoiceError />,
    loader: () => defer({ prevCompanies: getPreviousCompanies() }),
  },
];
