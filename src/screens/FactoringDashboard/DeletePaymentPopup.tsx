import { memo, useCallback, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { Button } from 'components/Button';
import { PopUp } from 'components/PopUp';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { deleteRequestId, useDeleteStatus } from 'state/payments';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { PENDING } from 'state';

const phrases = (t: TranslateFn) => ({
  title: t('Delete request'),
  bodyText: t('Are you sure you want to delete the request? All entered information will be lost.'),
  deleteText: t('Delete'),
  cancelText: t('Cancel'),
});

export interface DeletePaymentPopupProps {
  onClose: () => void;
  requestId: string | undefined;
}

const footerStyle = (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: `repeat(2, minmax(${theme.spacing(12)}, 1fr))`,
    columnGap: theme.spacing(2.5),
    marginTop: theme.spacing(1),
  });

export const DeletePaymentPopup = memo((props: DeletePaymentPopupProps) => {
  const { onClose, requestId } = props;
  const translations = useTranslatedText(phrases);
  const [open, setOpen] = useState(false);
  const deleteStatus = useDeleteStatus(requestId);
  const loading = deleteStatus === PENDING;

  const close = useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);

  const handleDelete = useCallback(() => {
    if (requestId) {
      deleteRequestId(requestId);
    }
  }, [requestId]);

  useEffect(() => {
    if (requestId) {
      setOpen(true);
    }
  }, [requestId]);

  useEffect(() => {
    if (deleteStatus === true) {
      close();
    }
  }, [deleteStatus, close]);

  return (
    <PopUp
      body={translations.bodyText}
      open={open}
      title={translations.title}
      footer={
        <div css={footerStyle}>
          <Button color="secondary" disabled={loading} onClick={close}>
            {translations.cancelText}
          </Button>
          <Button disabled={loading} onClick={handleDelete}>
            {translations.deleteText}
          </Button>
          <LoadingBackdrop loading={loading} />
        </div>
      }
    />
  );
});
