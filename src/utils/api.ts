import { Observable, of } from 'rxjs';
import { raiseNotification } from 'state/notifications';

// dummy t function for translation extraction
const t = (str: string) => str;
export const dummyFunctionForTranslation = t;

const phrases = {
  badResponse: t('Response was not ok'),
};

export const toResponseData =
  <TNoContent = any>(noContentDefault: TNoContent) =>
  <TData = any>({
    data,
    ok,
    status,
  }: {
    data: TData;
    ok: boolean;
    status: number;
  }): TData | TNoContent => {
    if (ok) {
      return status === 204 ? noContentDefault : data;
    }

    throw new Error(phrases.badResponse);
  };

const anyChildExists = (object: { [key: string]: any }): boolean => {
  let anyValueExists = false;
  Object.values(object).forEach((value) => {
    if (value) {
      anyValueExists = true;
    }
  });
  return anyValueExists;
};

export const anyChildExistsOrUndefined = <T extends { [key: string]: any }>(
  object: T
): T | undefined => {
  if (anyChildExists(object)) {
    return object;
  }
  return undefined;
};

export const dateOrNull = (time: string | undefined) => {
  if (time) {
    return new Date(time);
  }
  return null;
};

export const ifOkThenTrue = ({ ok }: { ok: boolean }) => {
  if (ok) {
    return true;
  }

  throw new Error(phrases.badResponse);
};

export const handleError =
  <TReturn = any>(message: string, returnValue: TReturn): ((error: any) => Observable<TReturn>) =>
  () => {
    raiseNotification({ type: 'error', message, translate: true });

    return of(returnValue);
  };
