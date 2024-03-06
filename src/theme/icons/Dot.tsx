import { iconStyle } from './styles';
import { IconProps } from './types';

export const Dot = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="3" />
  </svg>
);
