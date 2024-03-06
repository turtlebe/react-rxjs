import { useCallback, useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import { getDownloadLink } from 'api/files';
import { raiseNotification } from 'state/notifications';
import { TranslateFn, useTranslatedText } from './useTranslatedText';

const phrases = (t: TranslateFn) => ({
  errorDownloading: t('An error occurred while setting up the file download.'),
});

export const useDownloadFile = () => {
  const translations = useTranslatedText(phrases);
  const subscription = useRef<Subscription>();

  const downloadFile = useCallback(
    (fileId: string) => {
      subscription.current = getDownloadLink(fileId).subscribe((data) => {
        if (data) {
          try {
            const anchor = document.createElement('a');
            anchor.href = data.url;
            anchor.download = data.filename;

            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
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

  return downloadFile;
};
