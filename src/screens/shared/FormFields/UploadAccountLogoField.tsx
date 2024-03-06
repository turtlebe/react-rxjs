import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Accept } from 'react-dropzone';
import { Typography } from 'components/Typography';
import { UploadButton, UploadState } from 'components/Button';
import { useAccountCompanyLogoUpload } from 'hooks/useAccountCompanyLogoUpload';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ACCEPT = {
  'image/*': ['.jpeg', '.png'],
};

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  flexShrink: 0,
  overflow: 'auto',
});

export interface UploadAccountLogoFieldProps {
  accept?: Accept;
  className?: string;
  handleUpdateLogo: () => void;
  label: string;
  title: string;
}

export const UploadAccountLogoField = (props: UploadAccountLogoFieldProps) => {
  const { accept = DEFAULT_ACCEPT, className, label, title, handleUpdateLogo } = props;

  const [filename, setFilename] = useState<string>();
  const [uploadLink, setUploadLink] = useState<string>();

  const setFormFields = useCallback(
    (logoUploadLink: string, uploadedFilename: string) => {
      setUploadLink(logoUploadLink);
      setFilename(uploadedFilename);
      handleUpdateLogo();
    },
    [handleUpdateLogo]
  );

  const { clearUpload, progress, uploadError, uploadFile, uploadState } =
    useAccountCompanyLogoUpload({
      setFormFields,
    });

  const handleChange = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles?.length ? acceptedFiles[0] : null;

      if (file) {
        uploadFile(file);
      } else {
        clearUpload();
      }
    },
    [clearUpload, uploadFile]
  );

  const handleRemoveClick = useCallback(() => {
    setFilename('');
    setUploadLink('');
    clearUpload();
  }, [clearUpload, setFilename]);

  useEffect(() => {
    if (filename === '') {
      clearUpload();
    }
  }, [filename, clearUpload]);

  return (
    <div className={className} css={style}>
      <Typography css={(theme) => ({ margin: theme.spacing(3.75, 0, 2) })} variant="h3">
        {title}
      </Typography>
      <UploadButton
        error={!!uploadError}
        filename={filename}
        helperText={uploadError}
        label={label}
        progress={progress}
        state={uploadLink ? UploadState.Success : uploadState}
        dropzoneProps={{
          multiple: false,
          maxSize: MAX_SIZE,
          accept,
          onDrop: (acceptedFiles) => {
            handleChange(acceptedFiles);
          },
        }}
        onRemoveClick={handleRemoveClick}
        onRetryClick={handleChange}
      />
    </div>
  );
};
