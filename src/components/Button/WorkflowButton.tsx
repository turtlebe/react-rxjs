import { forwardRef } from 'react';
import { Theme, css } from '@emotion/react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { Plus } from 'theme/icons';

type WorkflowButtonBaseProps = Omit<
  MuiButtonProps,
  'color' | 'endIcon' | 'size' | 'startIcon' | 'variant'
>;

export interface WorkflowButtonProps extends WorkflowButtonBaseProps {
  startIcon: React.ReactNode;
}

const style = (theme: Theme) =>
  css({
    background: theme.palette.primary.faded,
    color: theme.palette.primary.main,
    padding: theme.spacing(0.875, 1.5),
    fontSize: theme.typography.h3.fontSize,

    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.button.fontSize,
    },

    '&: hover': {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },

    '& .MuiButton-startIcon': {
      marginRight: 'auto',
    },

    '& .MuiButton-endIcon': {
      marginLeft: 'auto',
      marginRight: '3px',
    },
  });

export const WorkflowButton = forwardRef<HTMLButtonElement, WorkflowButtonProps>((props, ref) => {
  const { children, fullWidth = true, ...rest } = props;

  return (
    <MuiButton
      color="primary"
      css={style}
      endIcon={<Plus />}
      fullWidth={fullWidth}
      ref={ref}
      size="medium"
      variant="contained"
      {...rest}
    >
      {children}
    </MuiButton>
  );
});
