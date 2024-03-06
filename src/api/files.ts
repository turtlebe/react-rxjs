import { catchError, from, map, Observable } from 'rxjs';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { handleError, toResponseData } from 'utils/api';
import { fetcher } from './fetch';
import { DownloadData, UploadData } from './types';

// dummy t function for translation extraction
const t = (str: string) => str;
const phrases = {
  getUploadLinkError: t('An error occurred registering a new file upload'),
  getDownloadLinkError: t('An error occurred getting the download url'),
};

const fetchUploadData = fetcher.path('/file-upload').method('post').create();
export const getUploadLink = (
  filename: string,
  contentType: string
): Observable<UploadData | undefined> =>
  from(fetchUploadData({ filename, contentType })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getUploadLinkError, undefined))
  );

export const startSingleFileUpload = (link: string, file: File) =>
  new Observable<number>((subscriber) => {
    const uppy = new Uppy();
    uppy.use(AwsS3, {
      getUploadParameters: () => ({
        method: 'put',
        url: link,
        headers: {
          'Content-Type': file.type,
        },
      }),
    });

    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
    });

    uppy.on('progress', (progress) => {
      subscriber.next(progress);
    });

    uppy.on('complete', (result) => {
      if (result.failed.length > 0) {
        result.failed.forEach(({ error }) => {
          subscriber.error(error);
        });
      }

      subscriber.complete();
    });

    uppy.upload();

    return () => {
      uppy.close();
    };
  });

const fetchDownloadLink = fetcher.path('/file-download/{id}').method('get').create();
export const getDownloadLink = (uploadId: string): Observable<DownloadData | undefined> =>
  from(fetchDownloadLink({ id: uploadId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getDownloadLinkError, undefined))
  );
