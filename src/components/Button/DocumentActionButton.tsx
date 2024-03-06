import { forwardRef, MouseEventHandler } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { css, Theme } from '@emotion/react';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Bin, Create, Download, UploadSmall } from 'theme/icons';

const phrases = (t: TranslateFn) => ({
  uploadLabel: t('Upload'),
  downloadLabel: t('Download'),
  createLabel: t('Create'),
  deleteLabel: t('Delete'),
});

type DocumentActionButtonBaseProps = Omit<
  MuiButtonProps,
  'children' | 'color' | 'endIcon' | 'fullWidth' | 'onClick' | 'size' | 'startIcon' | 'variant'
>;

export interface DocumentActionButtonProps extends DocumentActionButtonBaseProps {
  actionType: 'create' | 'delete' | 'download' | 'upload';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const style = (theme: Theme) =>
  css({
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,

    '& .MuiButton-endIcon > svg': {
      fontSize: theme.spacing(1.5),
    },
  });

export const DocumentActionButton = forwardRef<HTMLButtonElement, DocumentActionButtonProps>(
  (props, ref) => {
    const { actionType, onClick, ...rest } = props;
    const translations = useTranslatedText(phrases);

    return (
      <MuiButton
        color="secondary"
        css={style}
        ref={ref}
        variant="text"
        endIcon={
          actionType === 'download' ? (
            <Download />
          ) : actionType === 'upload' ? (
            <UploadSmall />
          ) : actionType === 'create' ? (
            <Create />
          ) : (
            <Bin />
          )
        }
        onClick={onClick}
        {...rest}
      >
        <div css={{ marginTop: 2 }}>
          {actionType === 'download'
            ? translations.downloadLabel
            : actionType === 'upload'
            ? translations.uploadLabel
            : actionType === 'create'
            ? translations.createLabel
            : translations.deleteLabel}
        </div>
      </MuiButton>
    );
  }
);
