import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { CircularProgress } from 'components/CircularProgress';
import { Button, ButtonProps } from './Button';

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const spinnerStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    right: theme.spacing(1),
  });

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (props, ref) => {
    const { children, disabled, loading, ...rest } = props;

    return (
      <Button {...rest} disabled={loading || disabled} ref={ref}>
        {children}
        {loading && <CircularProgress css={spinnerStyle} size={20} />}
      </Button>
    );
  }
);
