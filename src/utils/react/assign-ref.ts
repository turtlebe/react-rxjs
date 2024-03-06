import type { MutableRefObject, LegacyRef } from 'react';

export function assignRef<T = any>(
  value: T,
  ref: LegacyRef<T> | MutableRefObject<T>
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    const refObj = ref as MutableRefObject<T | null>;
    refObj.current = value;
  }
}
