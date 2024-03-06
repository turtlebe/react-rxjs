import { useCallback, useEffect, useRef, useState } from 'react';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { UploadState } from 'components/Button';
import { startSingleFileUpload } from 'api/files';
import { UploadableDocumentTypes, UploadFileLink } from 'api/types';
import { getOrderDocumentUploadLink } from 'api/orders';

export interface OrderDocumentUploadProps {
  companyId?: string;
  documentType?: UploadableDocumentTypes;
  orderId?: string;
  setFormFields: (id: string, filename: string) => void;
}

export const useOrderDocumentUpload = (props: OrderDocumentUploadProps) => {
  const { companyId, documentType = 'PROOF_OF_DELIVERY', orderId, setFormFields } = props;
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

      const progress$ = getOrderDocumentUploadLink(
        orderId!,
        companyId!,
        documentType,
        file.name,
        file.type
      ).pipe(
        take(1),
        filter((result): result is UploadFileLink => !!result),
        tap(({ uploadId }) => {
          uploadIdRef.current = uploadId;
        }),
        switchMap(({ url }) => startSingleFileUpload(url!, file))
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
    [clearUpload, setFormFields, orderId, companyId, documentType]
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
