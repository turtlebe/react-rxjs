import { iconStyle } from './styles';
import { IconProps } from './types';

export const ArrowUp = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="8"
    viewBox="0 0 14 8"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.5 7.10664C13.2568 7.38244 12.8362 7.40928 12.56 7.16664L6.99996 2.22664L1.43996 7.16664C1.16201 7.3905 0.757067 7.35578 0.521297 7.08786C0.285526 6.81994 0.302568 6.41386 0.559957 6.16664L6.55996 0.833303C6.81163 0.612206 7.18829 0.612206 7.43996 0.833303L13.44 6.16664C13.7158 6.40981 13.7426 6.83037 13.5 7.10664Z" />
  </svg>
);
