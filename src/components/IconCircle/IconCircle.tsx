import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';

export interface IconCircleProps {
  children: React.ReactNode;
  className?: string;
}

const style = (theme: Theme) =>
  css({
    background: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    borderRadius: '50px',
    width: 'max-content',
    height: 'max-content',
  });

export const IconCircle = forwardRef<HTMLDivElement, IconCircleProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <div css={style} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);
