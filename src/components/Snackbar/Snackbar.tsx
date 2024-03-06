import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import MuiSnackbar, {
  SnackbarCloseReason,
  SnackbarProps as MuiSnackBarProps,
} from '@mui/material/Snackbar';
import { IconButton } from 'components/Button';
import { Cross } from 'theme/icons';

export interface SnackbarProps extends MuiSnackBarProps {}

export const buildSnackbarCloseButton = (
  handleClose: (e: Event | React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => void
) => (
  <IconButton aria-label="close" color="inherit" onClick={handleClose}>
    <Cross />
  </IconButton>
);

export const Snackbar = (props: SnackbarProps) => {
  const { children, ...rest } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [currentSnack, setCurrentSnack] = useState<ReactElement<any, any> | undefined>(undefined);

  const handleClose = useCallback(
    (_: Event | React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    },
    []
  );

  useEffect(() => {
    if (!open && currentSnack !== children) {
      setCurrentSnack(children);
      setOpen(true);
    } else if (open && currentSnack !== children) {
      setOpen(false);
    }
  }, [children, currentSnack, open]);

  const closeButton = useMemo(() => buildSnackbarCloseButton(handleClose), [handleClose]);

  return (
    <MuiSnackbar
      action={closeButton}
      autoHideDuration={4000}
      key={new Date().getTime()}
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={handleClose}
      {...rest}
    >
      {currentSnack}
    </MuiSnackbar>
  );
};
