import { useCallback, useContext } from 'react';
import { useMatches, useNavigate, useParams, useLocation } from 'react-router-dom';
import { sibling } from 'paths';
import { WorkflowContext } from './useWorkflow';

export interface WorkflowRouteHandle {
  index: number;
  next: string;
  previous?: string;
}

const DEFAULT_HANDLE: WorkflowRouteHandle = { index: 0, next: '' };

export const useWorkflowNavigation = () => {
  const { breadcrumbs, incrementProgress, progress } = useContext(WorkflowContext);
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { pathname } = useLocation();
  const matches = useMatches();
  const match = matches.find(({ handle }) => !!handle);
  const handle = (match?.handle as WorkflowRouteHandle) || DEFAULT_HANDLE;

  const next = useCallback(
    (params?: string) => {
      if (params) {
        if (customerId) {
          const pathArr = pathname.split('/');
          const currentPath = pathArr[pathArr.length - 1];
          navigate(pathname.replace(customerId, params).replace(currentPath, handle.next));
        } else {
          navigate(sibling(`${params}/${handle.next}`));
        }
      } else {
        navigate(sibling(handle.next));
      }
      if (progress === handle.index) {
        incrementProgress();
      }
    },
    [handle, incrementProgress, navigate, progress, customerId, pathname]
  );

  const back = useCallback(() => {
    if (handle.previous) {
      navigate(handle.previous);
    }
  }, [handle.previous, navigate]);

  return {
    breadcrumbs,
    progress,
    showBack: handle.index > 0,
    next,
    back,
    incrementProgress,
  };
};
