import { memo } from 'react';
import { CardStatusItem, CardSectionStatusCard } from 'components/Card';
import { useDateFormat } from 'hooks/useDateFormat';
import {
  useOrderWorkflowStepNamePhrase,
  useOrderWorkflowStepActionPhrase,
} from 'hooks/useOrderWorkflowStepPhrase';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Order, OrderWorkflowAction } from 'api/types';

const phrases = (t: TranslateFn) => ({
  notSent: t('Not sent'),
  openValue: t('Open'),
  title: t('Order status'),
  completed: t('Completed'),
});

export interface OrderStatusSectionProps extends Order {
  className?: string;
  handleOrderWorkflowAction: any;
  order: Order;
}

export const OrderStatusSection = memo((props: OrderStatusSectionProps) => {
  const { className, handleOrderWorkflowAction, order } = props;
  const translations = useTranslatedText(phrases);

  const stepHasActions = (availableActions: any) => {
    let hasActions = false;
    if (availableActions && availableActions.length !== 0) {
      hasActions = true;
    }
    return hasActions;
  };

  const extractFirstAction = (availableActions: any): OrderWorkflowAction =>
    availableActions.length && availableActions[0];

  const formatStepValue = (step: any) => {
    if (step.stepStatus === 'Complete') {
      return step.stepCompletionDate
        ? useDateFormat(step.stepCompletionDate)
        : translations.completed;
    }
    if (step.stepStatus === 'Skipped') {
      return translations.notSent;
    }
    if (stepHasActions(step.stepAvailableActions)) {
      return useOrderWorkflowStepActionPhrase(extractFirstAction(step.stepAvailableActions));
    }
    return translations.openValue;
  };

  return (
    <CardSectionStatusCard className={className} title={translations.title}>
      {order.orderWorkflow?.workflowSteps
        ?.sort((a, b) => {
          const actionSequence = {
            OrderUploaded: 1,
            OrderConfirmation: 2,
            PODUploaded: 3,
            InvoiceSent: 4,
            PODSent: 5,
            CreditNoteReceived: 6,
            PaymentReceived: 7,
            SentToCollections: 8,
            RecordPayment: 9,
            WrittenOff: 10,
          };
          return actionSequence[a.stepName!] - actionSequence[b.stepName!];
        })
        .map((step) => (
          <CardStatusItem
            isCompleted={step.stepStatus === 'Complete'}
            key={step.stepName}
            label={step.stepName ? useOrderWorkflowStepNamePhrase(step) : step.stepName}
            value={formatStepValue(step)}
            onClick={
              step.stepStatus === 'Actionable' && stepHasActions(step.stepAvailableActions)
                ? () => handleOrderWorkflowAction(extractFirstAction(step.stepAvailableActions))
                : undefined
            }
          />
        ))}
    </CardSectionStatusCard>
  );
});
