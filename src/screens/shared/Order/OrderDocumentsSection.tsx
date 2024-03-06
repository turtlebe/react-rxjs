import { memo, useCallback, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { DownloadButton, DocumentActionButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useDownloadOrderDocument } from 'hooks/useDownloadOrderDocument';
import { Order, OrderDocumentActions } from 'api/types';

const phrases = (t: TranslateFn) => ({
  title: t('Documents'),
  orderLabel: t('Order'),
  orderConfirmationLabel: t('Order confirmation'),
  invoiceLabel: t('Invoice'),
  creditNoteLabel: t('Credit note'),
  proofOfDeliveryLabel: t('POD'),
  pleaseCompletePreviousStepFirst: t('Please complete previous steps first'),
  skipped: t('Order confirmation has not been created'),
});

export interface OrderDocumentsSectionProps extends Order {
  className?: string;
  handleDeleteDocument: (documentId: string) => void;
  handleOrderWorkflowAction: any;
  order: Order;
}

export const OrderDocumentsSection = memo((props: OrderDocumentsSectionProps) => {
  const { className, handleDeleteDocument, handleOrderWorkflowAction, order } = props;
  const { companyId, orderId } = useParams();
  const translations = useTranslatedText(phrases);
  const downloadDocument = useDownloadOrderDocument();

  const orderDocument = order.documentDetails?.find(({ documentType }) => documentType === 'Order');
  const orderConfirmation = order.documentDetails?.find(
    ({ documentType }) => documentType === 'OrderConfirmation'
  );
  const invoice = order.documentDetails?.find(({ documentType }) => documentType === 'Invoice');
  const creditNote = order.documentDetails?.find(
    ({ documentType }) => documentType === 'CreditNote'
  );
  const proofOfDelivery = order.documentDetails?.find(
    ({ documentType }) => documentType === 'ProofOfDelivery'
  );

  const buttonListStyle = () => () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginBottom: 0,
    });

  const noActionsStyle = () => (theme: Theme) =>
    css({
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    });

  const createActionElement = useCallback(
    (action: string, uploadId: string) => {
      let actionElement;
      switch (action) {
        case 'UploadOrder':
          actionElement = (
            <DocumentActionButton
              actionType="upload"
              key={action}
              onClick={() => {
                handleOrderWorkflowAction('UploadOrder');
              }}
            />
          );
          break;
        case 'SendOrderConfirmation':
          actionElement = (
            <DocumentActionButton
              actionType="create"
              key={action}
              onClick={() => {
                handleOrderWorkflowAction('SendOrderConfirmation');
              }}
            />
          );
          break;
        case 'UploadProofOfDelivery':
          actionElement = (
            <DocumentActionButton
              actionType="upload"
              key={action}
              onClick={() => {
                handleOrderWorkflowAction('UploadProofOfDelivery');
              }}
            />
          );
          break;
        case 'SendInvoice':
          actionElement = (
            <DocumentActionButton
              actionType="create"
              key={action}
              onClick={() => {
                handleOrderWorkflowAction('SendInvoice');
              }}
            />
          );
          break;
        case 'UploadCreditNote':
          actionElement = (
            <DocumentActionButton
              actionType="upload"
              key={action}
              onClick={() => {
                handleOrderWorkflowAction('UploadCreditNote');
              }}
            />
          );
          break;
        case 'delete':
          actionElement = (
            <DocumentActionButton
              actionType="delete"
              key={action}
              onClick={() => handleDeleteDocument(uploadId)}
            />
          );
          break;
        case 'download':
          actionElement = (
            <DownloadButton
              key={action}
              onClick={() => downloadDocument(companyId!, orderId!, uploadId)}
            />
          );
          break;
        default:
          actionElement = undefined;
      }
      return actionElement;
    },
    [downloadDocument, handleDeleteDocument, handleOrderWorkflowAction, companyId, orderId]
  );

  const createLineItem = useCallback(
    (label: string, uploadId: string, actions: OrderDocumentActions, documentType: string) => {
      const areActionsAvailable = (actions?.length ?? 0) > 0;
      return (
        <CardLineItem
          isDocumentItem
          label={label}
          space="small"
          valueAlignment="right"
          value={
            areActionsAvailable ? (
              <div css={buttonListStyle}>
                {actions?.map((action) => createActionElement(action, uploadId))}
              </div>
            ) : documentType === 'OrderConfirmation' ? (
              <div css={noActionsStyle}>
                <Typography variant="caption">{translations.skipped}</Typography>
              </div>
            ) : (
              <div css={noActionsStyle}>
                <Typography variant="caption">
                  {translations.pleaseCompletePreviousStepFirst}
                </Typography>
              </div>
            )
          }
        />
      );
    },
    [createActionElement, translations]
  );

  const orderItem = useMemo(
    () =>
      orderDocument
        ? createLineItem(
            translations.orderLabel,
            orderDocument.documentId || '',
            orderDocument.documentActions,
            orderDocument.documentType!
          )
        : null,
    [createLineItem, translations.orderLabel, orderDocument]
  );

  const orderConfirmationItem = useMemo(
    () =>
      orderConfirmation
        ? createLineItem(
            translations.orderConfirmationLabel,
            orderConfirmation.documentId || '',
            orderConfirmation.documentActions,
            orderConfirmation.documentType!
          )
        : null,
    [createLineItem, orderConfirmation, translations.orderConfirmationLabel]
  );

  const proofOfDeliveryItem = useMemo(
    () =>
      proofOfDelivery
        ? createLineItem(
            translations.proofOfDeliveryLabel,
            proofOfDelivery.documentId || '',
            proofOfDelivery.documentActions,
            proofOfDelivery.documentType!
          )
        : null,
    [createLineItem, proofOfDelivery, translations.proofOfDeliveryLabel]
  );

  const invoiceItem = useMemo(
    () =>
      invoice
        ? createLineItem(
            translations.invoiceLabel,
            invoice.documentId || '',
            invoice.documentActions,
            invoice.documentType!
          )
        : null,
    [createLineItem, invoice, translations.invoiceLabel]
  );

  const creditNoteItem = useMemo(
    () =>
      creditNote
        ? createLineItem(
            translations.creditNoteLabel,
            creditNote.documentId || '',
            creditNote.documentActions,
            creditNote.documentType!
          )
        : null,
    [createLineItem, creditNote, translations.creditNoteLabel]
  );

  return (
    <CardSection className={className} title={translations.title}>
      {orderItem}
      {orderConfirmationItem}
      {proofOfDeliveryItem}
      {order.orderDetails?.clearingSystem === 'invoice' ? invoiceItem : undefined}
      {order.orderDetails?.clearingSystem === 'credit_note' ? creditNoteItem : undefined}
    </CardSection>
  );
});
