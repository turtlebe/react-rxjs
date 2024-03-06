import { useCallback, useContext } from 'react';
import { WorkflowDataContext } from './useWorkflow';

export const useWorkflowData = <TData>(page: string) => {
  const { data, setData } = useContext(WorkflowDataContext);

  const setPageData = useCallback(
    (newData: { [key: string]: any }) => {
      setData(page, newData);
    },
    [page, setData]
  );

  return {
    data: data[page] as TData | undefined,
    setData: setPageData,
  };
};
