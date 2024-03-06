import { memo, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';

export interface ColumnLayoutProps {
  children: ReactNode;
  className?: string;
  flowDirection?: 'column' | 'one-column' | 'row';
}

const style = (flowDirection: 'column' | 'one-column' | 'row') => (theme: Theme) =>
  css({
    display: 'grid',
    rowGap: 0,
    columnGap: theme.spacing(3.75),
    gridTemplateColumns: flowDirection === 'row' ? '1fr 1fr' : '1fr',
    gridAutoFlow: flowDirection === 'one-column' ? 'row' : flowDirection,
    gridAutoColumns: '1fr',
    gridAutoRows: 'min-content',
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 0,
    marginBottom: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridAutoFlow: 'row',
      marginBottom: theme.spacing(3.75),
      flexGrow: 1,
    },

    '& .MuiFormControl-root': {
      marginBottom: 0,
      paddingBottom: theme.spacing(2.125),

      '& .MuiFormHelperText-root': {
        position: 'absolute',
        bottom: 0,
      },
    },

    '& .MuiCard-root': {
      marginBottom: theme.spacing(2.5),
    },
  });

export const ColumnLayout = memo((props: ColumnLayoutProps) => {
  const { children, className, flowDirection = 'row' } = props;

  return (
    <div className={className} css={style(flowDirection)}>
      {children}
    </div>
  );
});
