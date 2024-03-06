import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbItems } from 'components/Breadcrumbs';
import { noop } from 'utils/noop';

type WorkflowData = { [page: string]: { [key: string]: any } };

export interface WorkflowContextValue {
  breadcrumbs: BreadcrumbItems;
  incrementProgress: () => void;
  progress: number;
}

export interface WorkflowDataContextValue {
  data: WorkflowData;
  setData: (page: string, data: { [key: string]: any }) => void;
}

export const WorkflowContext = createContext<WorkflowContextValue>({
  breadcrumbs: [] as any,
  incrementProgress: noop,
  progress: 0,
});
export const WorkflowDataContext = createContext<WorkflowDataContextValue>({
  data: {},
  setData: noop,
});

interface UseWorkflowArgs {
  breadcrumbs: BreadcrumbItems;
  initialProgress?: number;
}

export const useWorkflow = (args: UseWorkflowArgs) => {
  const { breadcrumbs, initialProgress = 0 } = args;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(breadcrumbs[initialProgress].path, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [progress, setProgress] = useState<number>(initialProgress);

  const incrementProgress = useCallback(() => {
    setProgress((prev) => prev + 1);
  }, []);

  const contextValue = useMemo<WorkflowContextValue>(
    () => ({
      incrementProgress,
      progress,
      breadcrumbs,
    }),
    [incrementProgress, breadcrumbs, progress]
  );

  const [workflowData, setWorkflowData] = useState<WorkflowData>({});

  const setData = useCallback((page: string, data: { [key: string]: any }) => {
    setWorkflowData((prev) => ({
      ...prev,
      [page]: data,
    }));
  }, []);

  const dataContextValue = useMemo<WorkflowDataContextValue>(
    () => ({
      data: workflowData,
      setData,
    }),
    [workflowData, setData]
  );

  const WorkflowProvider = useCallback(
    (props: { children: ReactNode }) => (
      <WorkflowContext.Provider value={contextValue}>
        <WorkflowDataContext.Provider value={dataContextValue}>
          {props.children}
        </WorkflowDataContext.Provider>
      </WorkflowContext.Provider>
    ),
    [contextValue, dataContextValue]
  );

  return {
    WorkflowProvider,
  };
};
