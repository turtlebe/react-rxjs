import { memo, ReactElement, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import Paper from '@mui/material/Paper';
import { CloseButton } from 'components/Button';

export interface PageProps {
  children: ReactNode;
  className?: string;
  header?: ReactElement;
  onClose?: () => void;
}

const style = (fullScreen: boolean) => (theme: Theme) =>
  css({
    background: theme.palette.background.default,
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: theme.spacing(3, 10),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1.25, 2.5, 0, 2.5),

      ...(fullScreen && {
        zIndex: 5,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        paddingBottom: theme.spacing(3.75),
      }),
    },
  });

const headerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    height: theme.spacing(6.25),
  });

export const Page = memo((props: PageProps) => {
  const { children, className, header, onClose } = props;
  const fullScreen = !!onClose;

  return (
    <Paper square className={className} css={style(fullScreen)} elevation={0}>
      {(onClose || header) && (
        <div css={headerStyle}>
          {onClose ? <CloseButton onClick={onClose} /> : <div />}
          {header}
        </div>
      )}
      <div css={{ overflow: 'auto', display: 'flex', flexFlow: 'column', flexGrow: 1 }}>
        {children}
      </div>
    </Paper>
  );
});
