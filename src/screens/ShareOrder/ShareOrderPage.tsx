import { memo, useCallback, useRef, useState, Suspense, useEffect } from 'react';
import { Subscription } from 'rxjs';
import { css, Theme } from '@emotion/react';
import { useNavigate, useLoaderData, useParams, RouteObject, defer, Await } from 'react-router-dom';
import { posthog } from 'posthog-js';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { shareOrderData, getOrderById } from 'state/orders';
import { Order } from 'api/types';
import { ErrorPage } from 'screens/ErrorPage';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { paths, sibling } from 'paths';
import { ShareOrderForm } from './ShareOrderForm';
import { ShareOrderFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  title: t('Share order'),
  mainText: t('Order successfully shared!'),
  subText: t('We have shared the order via email - you are on CC.'),
  errorDescription: t('There was an error sharing the order.'),
});

export const ShareOrderPage = memo(() => {
  const data = useLoaderData() as { order: Promise<Order> };
  const params = useParams();
  const translations = useTranslatedText(phrases);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subscription = useRef<Subscription>();
  const navigate = useNavigate();

  const style = (theme: Theme) =>
    css({
      display: 'flex',
      flexFlow: 'column nowrap',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',

      [theme.breakpoints.down('md')]: {
        flexGrow: 1,
      },
    });

  const handleSubmit = useCallback(
    async (formData: ShareOrderFormValues) => {
      setIsSubmitting(true);
      if (formData.email !== null) {
        subscription.current = shareOrderData(params.orderId!, formData.email).subscribe(
          (result) => {
            if (result) {
              navigate(sibling(paths.root.orders.order.actions.success.path), {
                state: {
                  mainText: translations.mainText,
                  subText: translations.subText,
                },
              });
              posthog.capture('Order shared', {
                orderId: params.orderId,
                sharedToEmail: formData.email,
              });
            } else {
              setIsSubmitting(false);
            }
          }
        );
      } else {
        setIsSubmitting(false);
      }
    },
    [params, navigate, translations.mainText, translations.subText]
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
      <Suspense fallback={<LoadingBackdrop loading />}>
        <Await
          errorElement={<ErrorPage description={translations.errorDescription} />}
          resolve={data.order}
        >
          {(order: Order) => (
            <div css={style}>
              <ShareOrderForm loading={isSubmitting} order={order} onSubmit={handleSubmit} />
            </div>
          )}
        </Await>
      </Suspense>
    </ForestHeaderPage>
  );
});
export const ShareOrderRoute: RouteObject[] = [
  {
    path: paths.root.orders.order.actions.shareOrder.path,
    element: <ShareOrderPage />,
    loader: ({ params }) => defer({ order: getOrderById(params.orderId!) }),
  },
];
