import { iconStyleWithStroke } from './styles';
import { IconProps } from './types';

export const ArrowLeft = ({ className }: IconProps) => (
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
      d="M0.876741 6.39963L6.31628 11.4346C6.55496 11.655 6.94167 11.655 7.18095 11.4346C7.41964 11.2141 7.41964 10.8561 7.18095 10.6356L2.17287 6.00018L7.18035 1.36474C7.41903 1.1443 7.41903 0.786239 7.18035 0.565236C6.94167 0.344791 6.55436 0.344791 6.31568 0.565236L0.876138 5.60012C0.641122 5.81829 0.641122 6.18198 0.876741 6.39963Z"
      strokeWidth="0.5"
    />
  </svg>
);
