import { memo, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { useIsMobileView } from 'hooks/useIsMobileView';

export interface WorkflowLayoutContentProps {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  title: string;
}

const style = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto',

    [theme.breakpoints.down('md')]: {
      flexGrow: 1,
    },
  });

const headerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    flexShrink: 0,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1.5),
    },
  });

export const WorkflowLayoutContent = memo((props: WorkflowLayoutContentProps) => {
  const { children, className, description, title } = props;

  const isMobileView = useIsMobileView();

  return (
    <div className={className} css={style}>
      <div css={headerStyle}>
        <Typography
          css={(theme) => ({ marginBottom: theme.spacing(1) })}
          variant={isMobileView ? 'h2' : 'h1'}
        >
          {title}
        </Typography>
        <Typography component={typeof description === 'string' ? 'p' : 'div'} variant="body1">
          {description}
        </Typography>
      </div>
      {children}
    </div>
  );
});
