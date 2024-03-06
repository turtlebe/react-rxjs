import { iconStyle } from './styles';
import { IconProps } from './types';

export const Dropdown = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="6"
    viewBox="0 0 10 6"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 6L10 0.444445H0L5 6Z" />
  </svg>
);
