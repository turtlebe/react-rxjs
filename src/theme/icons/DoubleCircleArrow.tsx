import { iconStyle } from './styles';
import { IconProps } from './types';

export const DoubleCircleArrow = ({ className }: IconProps) => (
  <svg
    className={className}
    css={iconStyle}
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M2 7.69168C2 8.089 2.32208 8.41108 2.71938 8.41108C3.10546 8.39951 3.4135 8.08512 3.41719 7.69888C3.44661 6.03129 4.43409 4.52988 5.95362 3.84238C7.47314 3.15489 9.25276 3.40436 10.5247 4.48316H10.2945C9.89718 4.48316 9.57511 4.80524 9.57511 5.20256C9.57511 5.59987 9.89718 5.92196 10.2945 5.92196H12.3303C12.7276 5.92196 13.0497 5.59987 13.0497 5.20256V3.16665C13.0497 2.76934 12.7276 2.44725 12.3303 2.44725C11.933 2.44725 11.611 2.76934 11.611 3.16665V3.48319C9.93131 1.96698 7.51907 1.57574 5.44632 2.48337C3.37357 3.39099 2.02502 5.42902 2 7.69168ZM12.5676 8.20237C12.5676 7.80506 12.8897 7.48297 13.287 7.48297C13.6787 7.48687 13.9953 7.80346 13.9992 8.19518C14.0232 9.74333 13.4154 11.2344 12.3159 12.3245C10.1485 14.481 6.67321 14.5663 4.40263 12.5188V12.8353C4.40263 13.2326 4.08055 13.5547 3.68325 13.5547C3.28595 13.5547 2.96387 13.2326 2.96387 12.8353V10.7994C2.96387 10.4021 3.28595 10.08 3.68325 10.08H5.74069C6.13799 10.08 6.46007 10.4021 6.46007 10.7994C6.46007 11.1967 6.13799 11.5188 5.74069 11.5188H5.4889C6.77561 12.5906 8.56609 12.8213 10.0825 12.1109C11.5989 11.4004 12.5676 9.87699 12.5676 8.20237Z"
      fillRule="evenodd"
    />
  </svg>
);
