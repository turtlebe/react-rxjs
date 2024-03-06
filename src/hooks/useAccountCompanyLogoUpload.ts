import { useCallback, useEffect, useRef, useState } from 'react';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { UploadState } from 'components/Button';
import { updateAccountCompanyLogoFile } from 'state/user';
import { startSingleFileUpload } from 'api/files';
import { UploadLogoResponse } from 'api/types';

export interface AccountCompanyLogoUploadProps {
  mimeType?: string;
  setFormFields: (logoUploadLink: string, filename: string) => void;
}

export const useAccountCompanyLogoUpload = (props: AccountCompanyLogoUploadProps) => {
  const { mimeType = 'image/jpeg', setFormFields } = props;
  const uploadFileSubscription = useRef<Subscription | undefined>(undefined);
  const uploadLinkRef = useRef<string | undefined>(undefined);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState<UploadState>(UploadState.Ready);

  const clearUpload = useCallback(() => {
    setProgress(undefined);
    setUploadError(undefined);
    setUploadState(UploadState.Ready);
    uploadLinkRef.current = undefined;

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

      const progress$ = updateAccountCompanyLogoFile(mimeType).pipe(
        take(1),
        filter((result): result is UploadLogoResponse => !!result),
        tap(({ logoUploadLink }) => {
          uploadLinkRef.current = logoUploadLink;
        }),
        switchMap(({ logoUploadLink }) => startSingleFileUpload(logoUploadLink!, file))
      );

      uploadFileSubscription.current = progress$.subscribe({
        next: (percent) => {
          setProgress(percent);
        },
        complete: () => {
          if (uploadLinkRef.current) {
            setFormFields(uploadLinkRef.current, file.name);
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
    [clearUpload, setFormFields, mimeType]
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
