import { iconStyle } from './styles';
import { IconProps } from './types';

export const ArrowDown = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="8"
    viewBox="0 0 14 8"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.44 1.83334L7.43996 7.16667C7.18829 7.38777 6.81163 7.38777 6.55996 7.16667L0.559957 1.83334C0.302568 1.58612 0.285526 1.18004 0.521297 0.912119C0.757067 0.644198 1.16201 0.609472 1.43996 0.83334L6.99996 5.77334L12.56 0.83334C12.7367 0.663544 12.9924 0.60445 13.2258 0.679459C13.4591 0.754469 13.6325 0.951483 13.6772 1.19248C13.722 1.43348 13.6309 1.67959 13.44 1.83334Z" />
  </svg>
);
