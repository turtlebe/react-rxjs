import { iconStyle } from './styles';
import { IconProps } from './types';

export const Email = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="12"
    viewBox="0 0 14 12"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.91974 5.35676L12.9741 1.80476C12.6203 1.28125 12.0316 0.965343 11.3997 0.959961H2.43974C1.80456 0.959684 1.21036 1.27356 0.852539 1.79836L6.91974 5.35676Z" />
    <path d="M7.55953 6.45771C7.36507 6.57051 7.14434 6.63011 6.91953 6.63051C6.69531 6.63206 6.47461 6.57468 6.27953 6.46411L0.519531 3.09131V9.28011C0.519531 10.3405 1.37914 11.2001 2.43953 11.2001H11.3995C12.4599 11.2001 13.3195 10.3405 13.3195 9.28011V3.09131L7.55953 6.45771Z" />
  </svg>
);