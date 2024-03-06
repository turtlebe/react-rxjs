import { memo, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { useWorkflowNavigation } from 'hooks/useWorkflowNavigation';
import { WorkflowPage } from './WorkflowPage';

export interface WorkflowLayoutProps {
  children?: ReactNode;
  onClose: () => void;
}

const headerStyle = (theme: Theme) =>
  css({
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    flexShrink: 0,
    marginBottom: theme.spacing(3.75),
  });

export const WorkflowLayout = memo((props: WorkflowLayoutProps) => {
  const { children, onClose } = props;
  const { back, breadcrumbs, progress, showBack } = useWorkflowNavigation();

  return (
    <WorkflowPage onBack={showBack ? back : undefined} onClose={onClose}>
      <div css={headerStyle}>
        <Breadcrumbs breadcrumbs={breadcrumbs} progress={progress} />
      </div>
      <Outlet />
      {children}
    </WorkflowPage>
  );
});
