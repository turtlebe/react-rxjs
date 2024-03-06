import { iconStyleWithStroke } from './styles';
import { IconProps } from './types';

export const ArrowRight = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyleWithStroke}
    fill="none"
    height="12"
    viewBox="0 0 8 12"
    width="8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.1832 5.60012L1.74366 0.565187C1.50497 0.344743 1.11827 0.344743 0.878983 0.565187C0.640299 0.785633 0.640299 1.14369 0.878983 1.36414L5.88706 5.99957L0.879585 10.635C0.640902 10.8555 0.640902 11.2135 0.879585 11.4345C1.11827 11.655 1.50558 11.655 1.74426 11.4345L7.1838 6.39963C7.41881 6.18147 7.41881 5.81778 7.1832 5.60012Z"
      strokeWidth="0.5"
    />
  </svg>
);
