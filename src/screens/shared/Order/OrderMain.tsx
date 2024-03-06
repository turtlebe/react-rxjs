import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import posthog from 'posthog-js';
import { ColumnLayout } from 'components/Page';
import { Button } from 'components/Button';
import { PopUp } from 'components/PopUp';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText, useTranslationKeys } from 'hooks/useTranslatedText';
import { useOrderWorkflowStepActionDataMissingPhrase } from 'hooks/useOrderWorkflowStepPhrase';
import { useCheckOrderActionData } from 'hooks/useCheckOrderActionData';
import { Order, OrderWorkflowAction } from 'api/types';
import { fromRoot, path, paths } from 'paths';
import {
  createOrderDocumentAndGetId,
  deleteOrderDocumentById,
  deleteOrderId,
  getOrderById,
  useDeleteStatus,
} from 'state/orders';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { OrderStatusSection } from './OrderStatusSection';
import { CustomerSection } from './CustomerSection';
import { CustomerOrderSection } from './CustomerOrderSection';
import { LoadSection } from './LoadSection';
import { PlaceOfLoadingSection } from './PlaceOfLoadingSection';
import { ServicesPaymentSection } from './ServicesPaymentSection';
import { StipulationsSection } from './StipulationsSection';
import { OrderDocumentsSection } from './OrderDocumentsSection';
import { NextStepsSection } from './NextStepsSection';

export interface OrderMainProps {
  hideEdit?: boolean;
  order: Order;
}

const phrases = (t: TranslateFn) => ({
  missingDataTitle: t('We are missing some infos'),
  cancelButton: t('Cancel'),
  proceedButton: t('Provide infos now'),
  // Data points
  customerOrderNumber: t('Transport request number'),
  customerCompany: t('Customer company'),
  dispositionContact: t('Contact disposition'),
  bookkeepingContact: t('Contact bookkeeping'),
  loadingTime: t('Date of loading'),
  loadingPlace: t('Place & time of loading'),
  unloadingTime: t('Date of unloading'),
  unloadingPlace: t('Place & time of unloading'),
  loadDescription: t('Load description'),
  paymentTermDays: t('Payment term'),
  services: t('Services'),
  unknownDataPoint: t('Unknown data point'),
  deleteOrder: t('Delete order'),
  deleteDocument: t('Delete document'),
  deleteOrderDescription: t(
    'Are you sure you want to delete the order? All entered information will be lost.'
  ),
  deleteDocumentDescription: t('Are you sure you want to delete the document?'),
  delete: t('Delete'),
  orderConfirmationGenerateError: t('There was an error generating the order confirmation.'),
});

const blockOne = (theme: Theme) =>
  css({
    gridColumn: 1,
    gridRow: 1,

    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
      gridRow: 1,
    },
  });

const blockTwo = (theme: Theme) =>
  css({
    gridColumn: 2,
    gridRow: 1,

    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
      gridRow: 2,
    },
  });

const nextStepsStyle = (theme: Theme) =>
  css({
    gridColumn: '1 / 3',
    gridRow: 6,

    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
      gridRow: 10,
    },
  });

const modalFooterStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(2),
    rowGap: theme.spacing(1.5),
  });

const deleteModalFooterStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: theme.spacing(2.5),
    gap: theme.spacing(2.5),
  });

const modalBodyStyle = (theme: Theme) =>
  css({
    color: theme.palette.text.secondary,
  });

const bulletsStyle = (theme: Theme) =>
  css({
    margin: theme.spacing(1, 1.5, 0, 1.5),
    textAlign: 'left',
    paddingInlineStart: theme.spacing(2.25),

    '& li::marker': {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 'bolder',
    },

    [theme.breakpoints.down('md')]: {
      paddingInlineStart: 0,
      marginInlineStart: theme.spacing(4),
    },
  });
export const OrderMain = memo((props: OrderMainProps) => {
  const { hideEdit, order: originalOrder } = props;
  const { orderId } = useParams();
  const navigate = useNavigate();
  const translations = useTranslatedText(phrases);
  const translationKeys = useTranslationKeys(phrases);
  const [order, updateOrder] = useState<Order>(originalOrder);
  const areNextStepsAvailable = (order.workflowAvailableActions?.length ?? 0) > 0;
  const podDocumentId = useMemo(
    () =>
      order.documentDetails?.find((document) => document.documentType === 'ProofOfDelivery')
        ?.documentId || 'pod-missing',
    [order]
  );

  const [missingDataPopupOpen, setMissingDataPopupOpen] = useState(false);
  const [showDeleteOrderPopup, setShowDeleteOrderPopup] = useState(false);
  const [deleteDocumentId, setDeleteDocumentId] = useState<string | undefined>();
  const [actionMissingData, setActionMissingData] = useState('');
  const [missingData, setMissingData] = useState([]);
  const [sendTo, setSendTo] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const deleteStatus = useDeleteStatus(order.orderId);

  const handleMissingDataForAction = useCallback(
    (action: OrderWorkflowAction, dataMissing: any, whereTo: string) => {
      setActionMissingData(action);
      setMissingData(dataMissing);
      setSendTo(whereTo);
      setMissingDataPopupOpen(true);
    },
    []
  );

  const editCustomerPath = useMemo(
    () =>
      path(
        paths.root.orders.order.edit.customerContacts.path,
        order.orderDetails?.customerInformation.customerCompany?.companyId!
      ),
    [order.orderDetails?.customerInformation.customerCompany?.companyId]
  );

  const editOrderDetailsPath = useMemo(
    () => path(paths.root.orders.order.edit.orderDetails.path),
    []
  );

  const handleNavigateToMissingData = useCallback(() => {
    if (sendTo === 'customerContactEntry') {
      navigate(editCustomerPath);
    } else if (sendTo === 'orderDetailsEntry') {
      navigate(editOrderDetailsPath);
    }
  }, [editCustomerPath, editOrderDetailsPath, navigate, sendTo]);

  const handleDeleteOrder = useCallback(() => {
    deleteOrderId(order.orderId!);
  }, [order.orderId]);

  const handleDeleteDocument = useCallback(async () => {
    await deleteOrderDocumentById(orderId!, deleteDocumentId!);
    const updatedOrder = await getOrderById(orderId!);
    if (updatedOrder) {
      updateOrder(updatedOrder);
    }
    setDeleteDocumentId(undefined);
  }, [orderId, deleteDocumentId]);

  const handleCreateOrderConfirmation = useCallback(async () => {
    setLoading(true);
    const documentId = await createOrderDocumentAndGetId(
      order.orderId!,
      'ORDER_CONFIRMATION',
      translationKeys.orderConfirmationGenerateError
    );
    setLoading(false);
    if (documentId) {
      navigate(path(paths.root.orders.order.actions.orderConfirmation.path, documentId));
      posthog.capture('Order confirmation created', {
        orderId,
        documentType: 'ORDER_CONFIRMATION',
      });
    }
    return documentId;
  }, [order.orderId, translationKeys.orderConfirmationGenerateError, navigate, orderId]);

  const handleOrderWorkflowAction = useCallback(
    async (action: OrderWorkflowAction) => {
      const {
        isDataMissing,
        missingData: data,
        sendTo: sendPath,
        // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useCheckOrderActionData(action, order);
      if (isDataMissing) {
        handleMissingDataForAction(action, data, sendPath);
      } else {
        switch (action) {
          case 'UploadOrder':
            navigate(path(paths.root.orders.order.actions.uploadOrder.path));
            break;
          case 'SendOrderConfirmation':
            await handleCreateOrderConfirmation();
            break;
          case 'UploadProofOfDelivery':
            navigate(path(paths.root.orders.order.actions.uploadPod.path));
            break;
          case 'SendInvoice':
            navigate(path(paths.root.orders.order.actions.createInvoice.path));
            break;
          case 'SendProofOfDelivery':
            navigate(path(paths.root.orders.order.actions.sendPod.path, podDocumentId));
            break;
          case 'UploadCreditNote':
            navigate(path(paths.root.orders.order.actions.uploadCreditNote.path));
            break;
          case 'RecordPayment':
            navigate(path(paths.root.orders.order.actions.recordPayment.path));
            break;
          case 'FactorOrder':
            // IMPLEMENTATION DEFERRED
            break;
          case 'DeleteOrder':
            setShowDeleteOrderPopup(true);
            break;
          case 'ShareWithDriver':
            navigate(path(paths.root.orders.order.actions.shareOrder.path));
            break;
          default:
            navigate(path(paths.root.orders.path));
            break;
        }
      }
    },
    [navigate, handleMissingDataForAction, handleCreateOrderConfirmation, podDocumentId, order]
  );

  useEffect(() => {
    if (deleteStatus === true) {
      setShowDeleteOrderPopup(false);
      navigate(fromRoot(paths.root.orders.path));
    }
  }, [deleteStatus, navigate]);

  return (
    <ColumnLayout css={{ marginBottom: '0 !important' }}>
      {loading ? (
        <LoadingBackdrop />
      ) : (
        <>
          <div css={blockOne}>
            <OrderStatusSection
              handleOrderWorkflowAction={handleOrderWorkflowAction}
              order={order}
            />
            <PlaceOfLoadingSection
              editPath={editOrderDetailsPath}
              hideEdit={hideEdit}
              timeWindow={order.orderDetails?.loadDetails?.loadingTimeAndPlace?.timeWindow}
              venue={order.orderDetails?.loadDetails?.loadingTimeAndPlace?.venue}
            />
            <PlaceOfLoadingSection
              unloading
              editPath={editOrderDetailsPath}
              hideEdit={hideEdit}
              timeWindow={order.orderDetails?.loadDetails?.unloadingTimeAndPlace?.timeWindow}
              venue={order.orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue}
            />
            <LoadSection
              editPath={editOrderDetailsPath}
              hideEdit={hideEdit}
              loadDescription={order.orderDetails?.loadDetails?.loadDescription}
            />
            <CustomerOrderSection
              customerOrderNumber={order.orderDetails?.customerInformation.customerOrderNumber}
              editPath={editOrderDetailsPath}
              hideEdit={hideEdit}
            />
          </div>
          <div css={blockTwo}>
            <CustomerSection
              address={order.orderDetails?.customerInformation?.customerCompany?.details?.address}
              contacts={order.orderDetails?.customerInformation.contacts}
              editPath={editCustomerPath}
              hideEdit={hideEdit}
              companyName={
                order.orderDetails?.customerInformation?.customerCompany?.companyName
                  ? order.orderDetails?.customerInformation?.customerCompany?.companyName
                  : ''
              }
            />
            <ServicesPaymentSection
              clearingSystem={order.orderDetails?.clearingSystem}
              editPath={editOrderDetailsPath}
              hideEdit={hideEdit}
              paymentTermDays={order.orderDetails?.serviceAgreementDetails?.paymentTermDays}
              services={order.orderDetails?.serviceAgreementDetails?.services}
              vatRate={order.orderDetails?.serviceAgreementDetails?.vatRate}
            />
            <StipulationsSection
              editPath={editOrderDetailsPath}
              hideEdit={hideEdit}
              stipulations={order.orderDetails?.stipulations}
            />
            <OrderDocumentsSection
              handleDeleteDocument={setDeleteDocumentId}
              handleOrderWorkflowAction={handleOrderWorkflowAction}
              order={order}
            />
          </div>
          {areNextStepsAvailable && (
            <NextStepsSection
              css={nextStepsStyle}
              handleOrderWorkflowAction={handleOrderWorkflowAction}
              order={order}
            />
          )}
        </>
      )}

      <PopUp
        open={showDeleteOrderPopup}
        title={translations.deleteOrder}
        body={
          <div css={modalBodyStyle}>
            <Typography variant="body1">{translations.deleteOrderDescription}</Typography>
          </div>
        }
        footer={
          <div css={deleteModalFooterStyle}>
            <Button color="tertiary" onClick={() => setShowDeleteOrderPopup(false)}>
              {translations.cancelButton}
            </Button>
            <Button onClick={handleDeleteOrder}>{translations.delete}</Button>
          </div>
        }
      />
      <PopUp
        open={!!deleteDocumentId}
        title={translations.deleteDocument}
        body={
          <div css={modalBodyStyle}>
            <Typography variant="body1">{translations.deleteDocumentDescription}</Typography>
          </div>
        }
        footer={
          <div css={deleteModalFooterStyle}>
            <Button color="tertiary" onClick={() => setDeleteDocumentId(undefined)}>
              {translations.cancelButton}
            </Button>
            <Button onClick={handleDeleteDocument}>{translations.delete}</Button>
          </div>
        }
      />
      <PopUp
        open={missingDataPopupOpen}
        title={translations.missingDataTitle}
        titleSize="h3"
        body={
          <div css={modalBodyStyle}>
            <Typography variant="body1">
              {useOrderWorkflowStepActionDataMissingPhrase(actionMissingData)}
            </Typography>
            <Typography component="ul" css={bulletsStyle} variant="body1">
              {missingData?.map((dataPoint) => (
                <li key={dataPoint}>{translations[dataPoint]}</li>
              ))}
            </Typography>
          </div>
        }
        footer={
          <div css={modalFooterStyle}>
            <Button color="tertiary" onClick={() => setMissingDataPopupOpen(false)}>
              {translations.cancelButton}
            </Button>
            <Button onClick={() => handleNavigateToMissingData()}>
              {translations.proceedButton}
            </Button>
          </div>
        }
      />
    </ColumnLayout>
  );
});
