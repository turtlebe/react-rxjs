import { forwardRef, MouseEventHandler } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { css, Theme } from '@emotion/react';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Download } from 'theme/icons';

const phrases = (t: TranslateFn) => ({
  downloadLabel: t('Download'),
});

type DownloadButtonBaseProps = Omit<
  MuiButtonProps,
  'children' | 'color' | 'endIcon' | 'fullWidth' | 'onClick' | 'size' | 'startIcon' | 'variant'
>;

export interface DownloadButtonProps extends DownloadButtonBaseProps {
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

export const DownloadButton = forwardRef<HTMLButtonElement, DownloadButtonProps>((props, ref) => {
  const { onClick, ...rest } = props;
  const translations = useTranslatedText(phrases);

  return (
    <MuiButton
      color="secondary"
      css={style}
      endIcon={<Download />}
      ref={ref}
      variant="text"
      onClick={onClick}
      {...rest}
    >
      <div css={{ marginTop: 2 }}>{translations.downloadLabel}</div>
    </MuiButton>
  );
});
