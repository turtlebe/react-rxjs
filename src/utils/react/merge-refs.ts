import type { MutableRefObject, RefCallback, LegacyRef } from 'react';
import { assignRef } from './assign-ref';

export function mergeRefs<T = any>(
  refs: Array<LegacyRef<T> | MutableRefObject<T> | undefined>
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (ref) {
        assignRef(value, ref);
      }
    });
  };
}
