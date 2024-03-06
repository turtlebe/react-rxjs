import { useCallback, useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import { raiseNotification } from 'state/notifications';
import { getOrderDocument } from '../api/orders';
import { TranslateFn, useTranslatedText } from './useTranslatedText';

const phrases = (t: TranslateFn) => ({
  errorDownloading: t('An error occurred while setting up the document download.'),
});

export const useDownloadOrderDocument = () => {
  const translations = useTranslatedText(phrases);
  const subscription = useRef<Subscription>();

  const downloadDocument = useCallback(
    (companyId: string, orderId: string, documentId: string) => {
      subscription.current = getOrderDocument(companyId, orderId, documentId).subscribe((data) => {
        if (data) {
          try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', data.url!, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
              if (xhr.status === 200) {
                const blob = new Blob([xhr.response], { type: 'application/pdf' });
                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(blob);
                anchor.download = data.documentMetadata?.fileName || '';
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
              }
            };
            xhr.send();
          } catch (e) {
            raiseNotification({ type: 'error', message: translations.errorDownloading });
          }
        }
      });
    },
    [translations.errorDownloading]
  );

  useEffect(
    () => () => {
      if (subscription.current && !subscription.current.closed) {
        subscription.current.unsubscribe();
      }
    },
    []
  );

  return downloadDocument;
};
