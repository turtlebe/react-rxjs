import { forwardRef, Ref } from 'react';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import { css, Theme } from '@emotion/react';

export interface AlertProps extends MuiAlertProps {}

const style = (theme: Theme) =>
  css({
    '&.MuiAlert-filledSuccess': {
      color: theme.palette.success.contrastText,
    },

    '& .MuiAlert-message': {
      marginTop: theme.spacing(0.25),
    },
  });

export const Alert = forwardRef((props: AlertProps, ref: Ref<HTMLDivElement>) => (
  <MuiAlert css={style} elevation={4} ref={ref} variant="outlined" {...props} />
));
