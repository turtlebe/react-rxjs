import { iconStyle } from './styles';
import { IconProps } from './types';

export const Retry = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="14"
    viewBox="0 0 12 14"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 7.00005C12.0043 9.76513 10.1184 12.1751 7.43333 12.8356C4.7483 13.4961 1.95956 12.2362 0.680522 9.78472C-0.598512 7.33324 -0.0365822 4.32511 2.04121 2.5007C4.11899 0.676286 7.17453 0.508076 9.44002 2.09339L9.36669 1.88005C9.24887 1.52107 9.44437 1.13454 9.80336 1.01672C10.1623 0.8989 10.5489 1.0944 10.6667 1.45339L11.3334 3.45339C11.4004 3.65677 11.3657 3.87999 11.24 4.05339C11.1089 4.23805 10.893 4.34351 10.6667 4.33339H8.66669C8.2985 4.33339 8.00002 4.03491 8.00002 3.66672C8.00497 3.3772 8.19623 3.12398 8.47336 3.04005C6.66958 1.91269 4.33169 2.14774 2.78843 3.61161C1.24517 5.07548 0.887092 7.39771 1.91771 9.25846C2.94833 11.1192 5.10682 12.0476 7.16641 11.5159C9.226 10.9843 10.6655 9.12716 10.6667 7.00005C10.6667 6.63186 10.9652 6.33339 11.3334 6.33339C11.7015 6.33339 12 6.63186 12 7.00005Z" />
  </svg>
);
