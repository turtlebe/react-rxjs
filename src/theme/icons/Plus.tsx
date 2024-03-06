import { iconStyle } from './styles';
import { IconProps } from './types';

export const Plus = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="14"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
  </svg>
);
