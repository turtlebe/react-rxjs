import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Subscription } from 'rxjs';
import { LoadingButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { confirmPayment, usePaymentConfirmationDetails } from 'state/payments';
import { PENDING } from 'state';
import { fromRoot, paths, sibling } from 'paths';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { WorkflowLayoutContent } from '../shared/Workflow';
import { PaymentRequest } from '../shared/PaymentRequest';
import { TermsText } from './TermsText';

const phrases = (t: TranslateFn) => ({
  title: t('Final confirmation'),
  description: t('Please review your payment request before submitting it.'),
  buttonText: t('Get payment'),
});

export const PaymentsFinalConfirmation = memo(() => {
  const translations = useTranslatedText(phrases);
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const confirmationDetails = usePaymentConfirmationDetails(paymentId!);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subscription = useRef<Subscription>();

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);

    subscription.current = confirmPayment(paymentId!).subscribe((result) => {
      if (result) {
        navigate(sibling(paths.root.factoring.createPayment.paymentSubmitted.path), {
          state:
            confirmationDetails && confirmationDetails !== PENDING
              ? confirmationDetails.clearingSystem
              : 'invoice',
        });
      } else {
        setIsSubmitting(false);
      }
    });
  }, [confirmationDetails, paymentId, navigate]);

  useEffect(
    () => () => {
      if (subscription.current && !subscription.current.closed) {
        subscription.current.unsubscribe();
      }
    },
    []
  );

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      {confirmationDetails !== PENDING && confirmationDetails && (
        <PaymentRequest paymentRequest={confirmationDetails} />
      )}
      {confirmationDetails === undefined && <Navigate to={fromRoot(paths.root.factoring.path)} />}
      <TermsText css={(theme) => ({ marginBottom: theme.spacing(1.5) })} />
      <LoadingButton
        css={{ flexShrink: 0 }}
        loading={isSubmitting}
        type="submit"
        onClick={handleSubmit}
      >
        {translations.buttonText}
      </LoadingButton>
      <LoadingBackdrop loading={confirmationDetails === PENDING} />
    </WorkflowLayoutContent>
  );
});
