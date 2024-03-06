import { memo, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, Theme } from '@emotion/react';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { PopUp } from 'components/PopUp';
import { TruckGraphic } from 'components/TruckGraphic';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, paths } from 'paths';
import { WorkflowPage } from 'screens/shared/Workflow/WorkflowPage';

const phrases = (t: TranslateFn) => ({
  backToFactoringLabel: t('Back to the payment dashboard'),
  titleLabel: t('Payment pending'),
  textP1: t(
    'Your information has been submitted to Walbing for review. We will notify you once it has been authorized and your payment is on the way.'
  ),
  popupTitle: t("What's next?"),
  popupButtonText: t('Got it'),
  popupInvoiceText: t(
    'Please make sure to send your invoice containing the assignment note to your customer via e-mail.'
  ),
  popupCreditNoteText1: t(
    'Our partner Walbing will send an email to your debtor with you in cc to inform them to pay to your virtual IBAN.'
  ),
  popupCreditNoteText2: t("You don't have to do anything!"),
});

const bodyStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(10),

    '& > h2': {
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2.5),
    },
  });

export const PaymentSubmitted = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [popupOpen, setPopupOpen] = useState(true);

  const handleClose = useCallback(() => {
    navigate(fromRoot(paths.root.factoring.path));
  }, [navigate]);

  return (
    <WorkflowPage onClose={handleClose}>
      <div css={bodyStyle}>
        <TruckGraphic
          css={(theme) => ({ height: theme.spacing(37.5), marginBottom: theme.spacing(4) })}
        />
        <Typography variant="h2">{translations.titleLabel}</Typography>
        <Typography
          css={(theme) => ({ width: theme.spacing(38.75), textAlign: 'center' })}
          variant="body1"
        >
          {translations.textP1}
        </Typography>
      </div>
      <Button color="primary" onClick={handleClose}>
        {translations.backToFactoringLabel}
      </Button>
      <PopUp
        open={popupOpen}
        title={translations.popupTitle}
        titleSize="h3"
        body={
          state === 'invoice' ? (
            translations.popupInvoiceText
          ) : (
            <>
              {translations.popupCreditNoteText1}
              <br />
              <br />
              {translations.popupCreditNoteText2}
            </>
          )
        }
        footer={
          <Button color="primary" onClick={() => setPopupOpen(false)}>
            {translations.popupButtonText}
          </Button>
        }
      />
    </WorkflowPage>
  );
});
