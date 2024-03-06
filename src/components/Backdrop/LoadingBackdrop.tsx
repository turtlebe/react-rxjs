import { forwardRef, Ref } from 'react';
import { CircularProgress } from 'components/CircularProgress';
import { Backdrop } from './Backdrop';

export interface LoadingBackdropProps {
  className?: string;
  loading?: boolean;
}

export const LoadingBackdrop = forwardRef(
  (props: LoadingBackdropProps, ref: Ref<HTMLDivElement>) => {
    const { className, loading } = props;

    return (
      <Backdrop
        className={className}
        css={(theme) => ({ color: theme.palette.secondary.dark })}
        open={!!loading}
        ref={ref}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
);
