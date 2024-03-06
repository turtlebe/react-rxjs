import { forwardRef, Ref } from 'react';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

/*
 * This component is a placeholder for extending behaviour but also ensuring we
 * import not from the root of @mui/material which helps with tree-shaking
 */

export interface IconButtonProps extends MuiIconButtonProps {}

export const IconButton = forwardRef((props: IconButtonProps, ref: Ref<HTMLButtonElement>) => (
  <MuiIconButton ref={ref} {...props} />
));
