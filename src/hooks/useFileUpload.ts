import { useCallback, useEffect, useRef, useState } from 'react';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { UploadState } from 'components/Button';
import { getUploadLink, startSingleFileUpload } from 'api/files';
import { UploadData } from 'api/types';

export const useFileUpload = (setFormFields: (id: string, filename: string) => void) => {
  const uploadFileSubscription = useRef<Subscription | undefined>(undefined);
  const uploadIdRef = useRef<string | undefined>(undefined);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState<UploadState>(UploadState.Ready);

  const clearUpload = useCallback(() => {
    setProgress(undefined);
    setUploadError(undefined);
    setUploadState(UploadState.Ready);
    uploadIdRef.current = undefined;

    if (uploadFileSubscription.current?.closed === false) {
      // We only need to unsubscribe because the teardown logic of the
      // observable closes the uppy instance and cancels uploads.
      uploadFileSubscription.current?.unsubscribe();
    }
  }, []);

  const uploadFile = useCallback(
    (file: File) => {
      clearUpload();
      setUploadState(UploadState.Uploading);

      const progress$ = getUploadLink(file.name, file.type).pipe(
        take(1),
        filter((result): result is UploadData => !!result),
        tap(({ id }) => {
          uploadIdRef.current = id;
        }),
        switchMap(({ link }) => startSingleFileUpload(link, file))
      );

      uploadFileSubscription.current = progress$.subscribe({
        next: (percent) => {
          setProgress(percent);
        },
        complete: () => {
          if (uploadIdRef.current) {
            setFormFields(uploadIdRef.current, file.name);
            setUploadState(UploadState.Success);
          } else {
            setUploadState(UploadState.Error);
          }
        },
        error: (message: string) => {
          setUploadError(message);
          setUploadState(UploadState.Error);
        },
      });
    },
    [clearUpload, setFormFields]
  );

  useEffect(
    () => () => {
      uploadFileSubscription.current?.unsubscribe();
    },
    []
  );

  return {
    progress,
    uploadError,
    uploadState,
    uploadFile,
    clearUpload,
  };
};
