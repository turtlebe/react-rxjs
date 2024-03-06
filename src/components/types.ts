import { ReactElement } from 'react';

export type OptionType = number | string;

export interface Option<T extends OptionType = string> {
  label: ReactElement | string;
  value: T;
}
