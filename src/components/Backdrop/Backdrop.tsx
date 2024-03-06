import { forwardRef, Ref } from 'react';
import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';

export interface BackdropProps extends MuiBackdropProps {}

export const Backdrop = forwardRef((props: BackdropProps, ref: Ref<HTMLDivElement>) => (
  <MuiBackdrop
    ref={ref}
    transitionDuration={400}
    css={(theme) => ({
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: theme.shape.borderRadius,
    })}
    {...props}
  />
));
