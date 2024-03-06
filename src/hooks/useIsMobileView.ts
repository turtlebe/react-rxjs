import { Theme } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useIsMobileView = () =>
  useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
