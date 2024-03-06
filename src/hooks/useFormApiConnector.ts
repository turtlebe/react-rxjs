import { useCallback, useEffect } from 'react';
import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { filter, firstValueFrom, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { FieldValues } from 'react-hook-form';
import { useWorkflowNavigation } from 'hooks/useWorkflowNavigation';
import { PENDING } from 'state';
import { useWorkflowData } from './useWorkflowData';

const [useInitialFormValues] = bind(
  <TFieldValues extends FieldValues>(
    cachedData: TFieldValues | undefined,
    getApiFn: () => Observable<TFieldValues | undefined>
  ) =>
    of(cachedData).pipe(
      switchMap((data) => (data ? of(data) : getApiFn().pipe(startWith(PENDING))))
    ),
  PENDING
);

const [submitFormData$, submitFormData] = createSignal<unknown>();

const [useSubmittedFormDataResult, submittedFormDataResult$] = bind(
  <TFieldValues extends FieldValues>(sendApiFn: (data: TFieldValues) => Observable<boolean>) =>
    submitFormData$.pipe(
      switchMap((data) => sendApiFn(data as TFieldValues).pipe(startWith(PENDING)))
    ),
  undefined
);

export const useFormApiConnector = <TFieldValues extends FieldValues = FieldValues>(
  page: string,
  getApiFn: () => Observable<Partial<TFieldValues> | undefined>,
  sendApiFn: (data: TFieldValues) => Observable<boolean>
) => {
  const { data, setData } = useWorkflowData<TFieldValues>(page);
  const { next } = useWorkflowNavigation();
  const initialData = useInitialFormValues(data, getApiFn);

  const submitData = useCallback(
    (formData: TFieldValues) => {
      submitFormData(formData);

      return firstValueFrom(
        submittedFormDataResult$(sendApiFn as any).pipe(
          filter((result) => result !== PENDING),
          tap((result) => {
            if (result) {
              setData(formData);
            }
          })
        )
      );
    },
    [sendApiFn, setData]
  );
  const submitResult = useSubmittedFormDataResult(sendApiFn as any);

  useEffect(() => {
    if (initialData !== PENDING && initialData !== undefined && initialData !== data) {
      setData(initialData);
    }
  }, [data, initialData, setData]);

  useEffect(() => {
    if (submitResult === true) {
      if (page === 'customer-information' && data?.companyId) {
        next(data.companyId);
      } else {
        next();
      }
    }
  }, [submitResult, next, page, data]);

  return {
    initialValues: initialData !== PENDING ? (initialData as TFieldValues) : undefined,
    loading: initialData === PENDING,
    submitData,
  };
};
