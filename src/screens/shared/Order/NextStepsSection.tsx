import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { useOrderWorkflowStepActionPhraseVerbose } from 'hooks/useOrderWorkflowStepPhrase';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Order } from 'api/types';

const phrases = (t: TranslateFn) => ({
  title: t('Next steps'),
});

export interface NextStepsSectionProps extends Order {
  className?: string;
  handleOrderWorkflowAction: any;
  order: Order;
}

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
});

const headerStyle = (theme: Theme) =>
  css({
    marginBottom: theme.spacing(1.5),
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  });

const buttonGroupStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: `${theme.spacing(1.25)}, 0`,
    gap: theme.spacing(1.5),
  });

export const NextStepsSection = (props: NextStepsSectionProps) => {
  const { className, handleOrderWorkflowAction, order } = props;
  const translations = useTranslatedText(phrases);

  return (
    <div className={className} css={style}>
      <div css={headerStyle}>
        <Typography variant="h3">{translations.title}</Typography>
      </div>
      <div css={buttonGroupStyle}>
        {order.workflowAvailableActions
          ?.sort((a, b) => {
            const actionSequence = {
              UploadOrder: 1,
              SendOrderConfirmation: 2,
              ShareWithDriver: 3,
              UploadProofOfDelivery: 4,
              SendInvoice: 5,
              SendProofOfDelivery: 6,
              FactorOrder: 7,
              UploadCreditNote: 8,
              RecordPayment: 9,
              DeleteOrder: 10,
            };
            return actionSequence[a] - actionSequence[b];
          })
          .map((action) => (
            <Button
              color={action === 'DeleteOrder' ? 'tertiary' : 'primary'}
              key={action}
              onClick={() => handleOrderWorkflowAction(action)}
            >
              {useOrderWorkflowStepActionPhraseVerbose(action)}
            </Button>
          ))}
      </div>
    </div>
  );
};
