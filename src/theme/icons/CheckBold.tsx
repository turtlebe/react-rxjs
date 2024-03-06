import { iconStyle } from './styles';
import { IconProps } from './types';

export const CheckBold = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="11"
    viewBox="0 0 12 11"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.7476 2.28843L5.71087 9.65342C5.4464 9.98198 5.05141 10.1854 4.62426 10.2132H4.53371C4.13257 10.2154 3.747 10.0617 3.46219 9.78599L0.443837 6.84C-0.147946 6.2624 -0.147946 5.32593 0.443837 4.74834C1.03562 4.17074 1.99509 4.17074 2.58687 4.74834L4.41298 6.53067L9.39326 0.461914C9.93132 -0.0944408 10.8162 -0.156137 11.4298 0.319919C12.0434 0.795976 12.1815 1.65129 11.7476 2.28843Z" />
  </svg>
);
