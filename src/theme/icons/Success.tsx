import { iconStyle } from './styles';
import { IconProps } from './types';

export const Success = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.2381 7.72048L14.4371 5.66857L14.6881 2.95238L12.0236 2.34714L10.6286 0L8.11905 1.07762L5.60952 0L4.21452 2.34714L1.55 2.945L1.80095 5.66119L0 7.72048L1.80095 9.77238L1.55 12.496L4.21452 13.1012L5.60952 15.4483L8.11905 14.3633L10.6286 15.441L12.0236 13.0938L14.6881 12.4886L14.4371 9.77238L16.2381 7.72048ZM6.64286 11.411L3.69048 8.45857L4.73119 7.41786L6.64286 9.32214L11.5069 4.4581L12.5476 5.50619L6.64286 11.411Z" />
  </svg>
);
