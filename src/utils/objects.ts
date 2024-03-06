import { Option } from 'components/types';

export const removeUndefinedEntries = <T extends { [key: string]: any }>(obj: T | undefined) =>
  obj
    ? Object.entries(obj).reduce<T>(
        (acc, [key, value]) => (value !== undefined ? { ...acc, [key]: value } : acc),
        {} as T
      )
    : undefined;

export const sortOptions = (a: Option, b: Option) =>
  typeof a.label === 'string' && typeof b.label === 'string' ? a.label.localeCompare(b.label) : 0;
