import { useCallback } from 'react';
import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { filter, firstValueFrom, Observable, startWith, switchMap, tap } from 'rxjs';
import { FieldValues } from 'react-hook-form';
import { PENDING } from 'state';

const [useInitialFormValues] = bind(
  <TFieldValues extends FieldValues>(getApiFn: () => Observable<TFieldValues | undefined>) =>
    getApiFn().pipe(startWith(PENDING)),
  PENDING
);

const [submitFormData$, submitFormData] = createSignal<unknown>();

const [useSubmittedFormDataResult, submittedFormDataResult$] = bind(
  <TFieldValues extends FieldValues>(
    sendApiFn: (data: TFieldValues) => Observable<boolean | string | undefined>
  ) =>
    submitFormData$.pipe(
      switchMap((data) => sendApiFn(data as TFieldValues).pipe(startWith(PENDING)))
    ),
  undefined
);

export const useOrderFormApiConnector = <TFieldValues extends FieldValues = FieldValues>(
  getApiFn: () => Observable<Partial<TFieldValues> | undefined>,
  sendApiFn: (data: TFieldValues) => Observable<boolean | string | undefined>,
  next: (id?: string) => void
) => {
  const initialData = useInitialFormValues(getApiFn);

  const submitData = useCallback(
    (formData: TFieldValues) => {
      submitFormData(formData);
      return firstValueFrom(
        submittedFormDataResult$(sendApiFn as any).pipe(
          filter((result) => result !== PENDING),
          tap((result) => {
            if (result && result !== PENDING && typeof result === 'string') {
              next(result);
            } else {
              next();
            }
          })
        )
      );
    },
    [sendApiFn, next]
  );

  useSubmittedFormDataResult(sendApiFn as any);

  return {
    initialValues: initialData !== PENDING ? (initialData as TFieldValues) : undefined,
    loading: initialData === PENDING,
    submitData,
  };
};
