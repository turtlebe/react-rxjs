import { memo, useCallback, useMemo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { DownloadButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useDownloadFile } from 'hooks/useDownloadFile';
import { PaymentRequestDetail } from 'api/types';
import { paths, sibling } from 'paths';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Documents'),
  invoiceLabel: t('Invoice'),
  creditNoteLabel: t('Credit note'),
  proofOfDeliveryLabel: t('POD'),
  downloadLabel: t('Download'),
});

export interface DocumentsSectionProps extends Pick<PaymentRequestDetail, 'documents'> {
  className?: string;
  hideEdit?: boolean;
  showOnlyFilename?: boolean;
}

export const DocumentsSection = memo((props: DocumentsSectionProps) => {
  const { className, documents, hideEdit, showOnlyFilename } = props;
  const translations = useTranslatedText(phrases);
  const downloadFile = useDownloadFile();

  const invoice = documents.find(({ name }) => name === 'invoice');
  const creditNote = documents.find(({ name }) => name === 'credit_note');
  const proofOfDelivery = documents.find(({ name }) => name === 'proof_of_delivery');

  const valueAlignment = showOnlyFilename ? 'left' : 'right';

  const createLineItem = useCallback(
    (label: string, filename: string, uploadId: string) => {
      const value = showOnlyFilename ? (
        filename
      ) : (
        <DownloadButton onClick={() => downloadFile(uploadId)} />
      );

      return (
        <CardLineItem isDocumentItem label={label} value={value} valueAlignment={valueAlignment} />
      );
    },
    [downloadFile, showOnlyFilename, valueAlignment]
  );

  const invoiceItem = useMemo(
    () =>
      invoice
        ? createLineItem(translations.invoiceLabel, invoice.filename, invoice.uploadId)
        : null,
    [createLineItem, invoice, translations.invoiceLabel]
  );

  const creditNoteItem = useMemo(
    () =>
      creditNote
        ? createLineItem(translations.creditNoteLabel, creditNote.filename, creditNote.uploadId)
        : null,
    [createLineItem, creditNote, translations.creditNoteLabel]
  );

  const proofOfDeliveryItem = useMemo(
    () =>
      proofOfDelivery
        ? createLineItem(
            translations.proofOfDeliveryLabel,
            proofOfDelivery.filename,
            proofOfDelivery.uploadId
          )
        : null,
    [createLineItem, proofOfDelivery, translations.proofOfDeliveryLabel]
  );

  return (
    <CardSection
      className={className}
      title={translations.title}
      rightHeaderElement={
        !hideEdit ? (
          <EditButton to={sibling(paths.root.factoring.createPayment.uploadDocuments.path)} />
        ) : undefined
      }
    >
      {invoiceItem}
      {creditNoteItem}
      {proofOfDeliveryItem}
    </CardSection>
  );
});
