import { memo, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from 'components/Typography';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { usePaymentStatusPhrase } from 'hooks/usePaymentStatusPhrase';
import { usePaymentStatusDescription } from 'hooks/usePaymentStatusDescription';
import { PaymentRequestDetail } from 'api/types';
import { PaymentRequest } from 'screens/shared/PaymentRequest';
import { ContactPopup } from 'screens/shared/ContactPopup';

export interface PaymentRequestDetailsProps {
  paymentRequest: PaymentRequestDetail;
}

export const PaymentRequestDetails = memo((props: PaymentRequestDetailsProps) => {
  const { paymentRequest } = props;
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const isMobileView = useIsMobileView();

  const handleOpenContactPopup = useCallback(() => {
    setIsContactPopupOpen(true);
  }, []);

  const handleCloseContactPopup = useCallback(() => {
    setIsContactPopupOpen(false);
  }, []);

  const title = usePaymentStatusPhrase(paymentRequest.status);
  const description = usePaymentStatusDescription(paymentRequest.status, handleOpenContactPopup);

  return (
    <Box>
      <Typography
        css={(theme) => ({ marginBottom: theme.spacing(1.25) })}
        variant={isMobileView ? 'h2' : 'h1'}
      >
        {title}
      </Typography>
      <div css={(theme) => ({ marginTop: theme.spacing(1.25), marginBottom: theme.spacing(2.75) })}>
        {description}
      </div>
      <PaymentRequest hideEdit paymentRequest={paymentRequest} />
      <ContactPopup open={isContactPopupOpen} onClose={handleCloseContactPopup} />
    </Box>
  );
});
