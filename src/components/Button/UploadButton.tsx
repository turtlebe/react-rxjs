import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Theme, css } from '@emotion/react';
import MuiButton from '@mui/material/Button';
import { DropEvent, DropzoneProps, FileRejection, useDropzone } from 'react-dropzone';
import { Typography } from 'components/Typography';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import colors from 'theme/colors';
import { Bin, Retry, Upload } from 'theme/icons';
import { assignRef } from 'utils/react/assign-ref';
import { IconButton } from './IconButton';

const phrases = (t: TranslateFn) => ({
  unknownFile: t('unknown-file'),
  errorLabel: t('Error while uploading - please try again'),
  uploadingMobileSubtitle: t('is uploading'),
  successMobileSubtitle: t('successfully uploaded'),
  successSubtitle: t('Successfully uploaded'),
  readySubtitle: t('Drag and drop here or click to upload'),
  uploadingSubtitle: t('Uploading'),
});

export enum UploadState {
  Error = 'error',
  Ready = 'ready',
  Success = 'success',
  Uploading = 'uploading',
}

export interface UploadButtonProps {
  disabled?: boolean;
  dropzoneProps?: DropzoneProps;
  error?: boolean;
  filename?: string;
  helperText?: string;
  label: string;
  onRemoveClick: () => void;
  onRetryClick: (files: File[]) => void;
  progress: number | undefined;
  state: UploadState;
}

interface RootStyleProps {
  isDragAccept: boolean;
  isDragReject: boolean;
}

const rootStyle =
  ({ isDragAccept, isDragReject }: RootStyleProps) =>
  (theme: Theme) => {
    const borderColor = (
      isDragAccept
        ? theme.palette.primary.main
        : isDragReject
        ? theme.palette.error.main
        : theme.palette.secondary.dark
    ).substring(1);
    const borderWidth = isDragAccept || isDragReject ? 4 : 2;

    return css({
      display: 'flex',
      flexFlow: 'column nowrap',
      position: 'relative',

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1, 2.5),
        borderRadius: theme.spacing(1.25),
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23${borderColor}' stroke-width='${borderWidth}' stroke-dasharray='18%2c 10' stroke-dashoffset='18' stroke-linecap='round'/%3e%3c/svg%3e")`,
      },
    });
  };

const buttonStyle = (state: UploadState) => (theme: Theme) =>
  css({
    background: colors.Cloud,
    borderRadius: 10,
    height: theme.spacing(7),
    color: theme.palette.secondary.dark,
    overflow: 'hidden',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),

    '&:hover': {
      background: theme.palette.secondary.light,
    },

    ...(state === UploadState.Error && {
      background: `${theme.palette.error.faded} !important`,
    }),

    '&.Mui-disabled': {
      background: colors.Cloud,
      color: theme.palette.secondary.dark,
    },
  });

const progressStyle = (state: UploadState, progress: number) => (theme: Theme) =>
  css({
    background: `${theme.palette.primary.main}1A`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: state === UploadState.Success ? 0 : `${100 - progress}%`,
    bottom: 0,
  });

const actionButtonStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    right: theme.spacing(1.5),
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.secondary.main,
    zIndex: 3,
  });

const subtitleMobileStyle = (state: UploadState) => (theme: Theme) =>
  css({
    zIndex: 3,

    ...(state === UploadState.Success && {
      color: theme.palette.primary.main,
    }),
  });

const subtitleStyle = (state: UploadState) => (theme: Theme) =>
  css({
    margin: theme.spacing(2, 0, 2.5, 0),
    textAlign: 'center',
    color: theme.palette.secondary.main,

    ...(state === UploadState.Success && {
      color: theme.palette.primary.main,
    }),
  });

const helperTextStyle = (error?: boolean) => (theme: Theme) =>
  css({
    height: theme.spacing(1.625), // 13
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(0.625),
    flexShrink: 0,
    color: error ? theme.palette.error.main : theme.palette.text.secondary,
  });

interface ButtonComponentProps {
  disabled: boolean;
  label: string;
  open: () => void;
  progress: number;
  state: UploadState;
  subtitle: string;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const { disabled, label, open, progress, state, subtitle } = props;

  const isMobileView = useIsMobileView();
  const isMobileSubtitleVisible =
    isMobileView && [UploadState.Uploading, UploadState.Success].includes(state);

  const startIcon = useMemo(
    () =>
      state === UploadState.Ready ? (
        <Upload
          css={(theme) => ({
            color: theme.palette.primary.main,
          })}
        />
      ) : undefined,
    [state]
  );

  return (
    <MuiButton
      fullWidth
      color="secondary"
      css={buttonStyle(state)}
      disabled={disabled}
      size="small"
      startIcon={startIcon}
      variant="contained"
      onClick={open}
    >
      {[UploadState.Uploading, UploadState.Success].includes(state) && (
        <div css={progressStyle(state, progress)} />
      )}
      <div
        css={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(0, 2),
          overflow: 'auto',
        })}
      >
        <Typography
          variant={state === UploadState.Ready ? 'h4' : 'body2'}
          css={{
            zIndex: 2,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {label}
        </Typography>
        {isMobileSubtitleVisible && (
          <Typography css={subtitleMobileStyle(state)} variant="body2">
            {subtitle}
          </Typography>
        )}
      </div>
    </MuiButton>
  );
};

const EMPTY_FILES: File[] = [];
const EMPTY_REJECTED: FileRejection[] = [];

export const UploadButton = forwardRef<HTMLInputElement, UploadButtonProps>((props, ref) => {
  const {
    disabled,
    dropzoneProps,
    error,
    filename: filenameFromProps,
    helperText,
    label: uploadLabel,
    onRemoveClick,
    onRetryClick,
    progress = 0,
    state,
  } = props;
  const translations = useTranslatedText(phrases);
  const [files, setFiles] = useState<File[]>(EMPTY_FILES);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>(EMPTY_REJECTED);

  const handleDrop = useCallback(
    <T extends File>(accepted: T[], rejected: FileRejection[], event: DropEvent) => {
      setFiles(accepted);
      setRejectedFiles(rejected);

      dropzoneProps?.onDrop?.(accepted, rejected, event);
    },
    [dropzoneProps]
  );

  const handleRemove = useCallback(() => {
    setFiles(EMPTY_FILES);
    onRemoveClick?.();
  }, [onRemoveClick]);

  const dropzoneDisabled = disabled || [UploadState.Uploading, UploadState.Success].includes(state);
  const { getInputProps, getRootProps, inputRef, isDragAccept, isDragReject, open } = useDropzone({
    ...dropzoneProps,
    onDrop: handleDrop,
    noClick: true,
    noKeyboard: true,
    disabled: dropzoneDisabled,
  });
  const isMobileView = useIsMobileView();

  const filename = filenameFromProps || files.map((f) => f.name).join(' ');
  const rejectedText = rejectedFiles
    .map((f) => `${f.file.name} (${f.errors.map((e) => e.message).join(', ')})`)
    .join(', ');

  let label: string;
  let subtitle: string;
  switch (state) {
    case UploadState.Uploading:
      label = filename || translations.unknownFile;
      subtitle = isMobileView
        ? translations.uploadingMobileSubtitle
        : translations.uploadingSubtitle;
      break;
    case UploadState.Success:
      label = filename || translations.unknownFile;
      subtitle = isMobileView ? translations.successMobileSubtitle : translations.successSubtitle;
      break;
    case UploadState.Error:
      label = translations.errorLabel;
      subtitle = translations.readySubtitle;
      break;
    default:
      label = uploadLabel;
      subtitle = translations.readySubtitle;
  }

  useEffect(() => {
    assignRef(inputRef.current, ref);
  }, [inputRef, ref]);

  return (
    <div css={rootStyle({ isDragAccept, isDragReject })} {...getRootProps()}>
      <input key={filename} {...getInputProps()} />
      {!isMobileView && (
        <Typography css={subtitleStyle(state)} variant="body2">
          {subtitle}
        </Typography>
      )}
      <div css={{ position: 'relative' }}>
        <ButtonComponent
          disabled={dropzoneDisabled}
          label={label}
          open={open}
          progress={progress}
          state={state}
          subtitle={subtitle}
        />
        {(state === UploadState.Uploading || state === UploadState.Success) && (
          <IconButton
            aria-label="clear file"
            css={actionButtonStyle}
            disabled={disabled}
            size="medium"
            onClick={handleRemove}
          >
            <Bin />
          </IconButton>
        )}
        {state === UploadState.Error && (
          <IconButton
            aria-label="retry"
            css={actionButtonStyle}
            disabled={disabled}
            size="medium"
            onClick={() => onRetryClick?.(files)}
          >
            <Retry />
          </IconButton>
        )}
      </div>
      <div css={helperTextStyle(error)}>
        {(helperText || rejectedText) && (
          <Typography variant="caption">{helperText || rejectedText}</Typography>
        )}
      </div>
    </div>
  );
});
