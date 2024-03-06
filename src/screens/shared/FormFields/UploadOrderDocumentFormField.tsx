import { useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { Accept } from 'react-dropzone';
import { Typography } from 'components/Typography';
import { UploadButton, UploadState } from 'components/Button';
import { useChangedField } from 'hooks/useChangedField';
import { useOrderDocumentUpload } from 'hooks/useOrderDocumentUpload';
import { UploadableDocumentTypes } from 'api/types';
import { BaseFormField } from './BaseFormField';
import { useFormFieldName } from './hooks';
import { FormFieldProps } from './types';
import type { TypographyVariant } from '@mui/material';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ACCEPT = {
  'application/pdf': ['.pdf'],
};

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  flexShrink: 0,
  overflow: 'auto',
});

export interface UploadOrderDocumentFormFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends FormFieldProps<TFieldValues> {
  accept?: Accept;
  className?: string;
  companyId?: string;
  description?: string;
  documentType?: UploadableDocumentTypes;
  filenameFieldName: Path<TFieldValues>;
  label: string;
  orderId?: string;
  title?: string;
  titleVariant?: TypographyVariant;
}

export const UploadOrderDocumentFormField = <TFieldValues extends FieldValues = FieldValues>(
  props: UploadOrderDocumentFormFieldProps<TFieldValues>
) => {
  const {
    accept = DEFAULT_ACCEPT,
    className,
    description,
    disabled,
    filenameFieldName,
    helperText,
    label,
    name,
    namePath,
    title,
    titleVariant = 'h2',
    orderId,
    companyId,
    documentType,
  } = props;
  const { setValue, watch } = useFormContext<TFieldValues>();

  const resolvedUploadIdField = useFormFieldName(name, namePath);
  const resolvedFilenameField = useFormFieldName(filenameFieldName, namePath);
  const { previous: previousUploadId, value: uploadIdValue } =
    useChangedField(resolvedUploadIdField);
  const filenameValue = watch(resolvedFilenameField);

  const setFormFields = useCallback(
    (uploadId: string, filename: string) => {
      setValue(resolvedUploadIdField, uploadId as any);
      setValue(resolvedFilenameField, filename as any);
    },
    [resolvedFilenameField, resolvedUploadIdField, setValue]
  );

  const { clearUpload, progress, uploadError, uploadFile, uploadState } = useOrderDocumentUpload({
    setFormFields,
    orderId,
    companyId,
    documentType,
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
    setFormFields('', '');
    clearUpload();
  }, [clearUpload, setFormFields]);

  useEffect(() => {
    if (uploadIdValue === '' && previousUploadId !== '') {
      clearUpload();
    }
  }, [uploadIdValue, clearUpload, previousUploadId]);

  return (
    <div className={className} css={style}>
      {title && (
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant={titleVariant}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography css={(theme) => ({ marginBottom: theme.spacing(3.75) })} variant="body1">
          {description}
        </Typography>
      )}
      <BaseFormField<TFieldValues>
        name={resolvedUploadIdField}
        render={({ error, field: { onBlur, ref }, isSubmitting, value }) => {
          const errored = (!value && !!error) || !!uploadError;
          const errorMessage = (!value ? error?.message : undefined) || uploadError;

          return (
            <UploadButton
              disabled={disabled || isSubmitting}
              error={errored}
              filename={uploadIdValue ? filenameValue : undefined}
              helperText={errorMessage || helperText}
              label={label}
              progress={progress}
              ref={ref}
              state={uploadIdValue ? UploadState.Success : uploadState}
              dropzoneProps={{
                multiple: false,
                maxSize: MAX_SIZE,
                disabled: isSubmitting,
                accept,
                onDrop: (acceptedFiles) => {
                  handleChange(acceptedFiles);
                  onBlur();
                },
              }}
              onRemoveClick={handleRemoveClick}
              onRetryClick={handleChange}
            />
          );
        }}
      />
    </div>
  );
};
