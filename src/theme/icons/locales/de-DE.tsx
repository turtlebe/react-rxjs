import { IconProps } from '../types';
import { localeFlagStyle } from './styles';

export const DeDEFlag = ({ className }: IconProps) => (
  <svg
    className={className}
    css={localeFlagStyle}
    height="336"
    viewBox="0 0 512 336"
    width="512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        d="M512.001 112.092H0V9.103A8.829 8.829 0 0 1 8.828.275h494.345a8.829 8.829 0 0 1 8.828 8.828v102.989z"
        fill="#464655"
      />
      <path
        d="M503.172 335.724H8.828A8.829 8.829 0 0 1 0 326.896V223.908h512v102.988a8.828 8.828 0 0 1-8.828 8.828z"
        fill="#FFE15A"
      />
      <path d="M0 112.088h512V223.9H0z" fill="#FF4B55" />
    </g>
  </svg>
);
