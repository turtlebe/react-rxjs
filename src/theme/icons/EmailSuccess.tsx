import { useTheme } from '@emotion/react';
import { iconStyle } from './styles';
import { IconProps } from './types';

export const EmailSuccess = ({ className }: IconProps) => {
  const theme = useTheme();

  return (
    <svg
      className={className}
      css={[iconStyle, { marginLeft: 2 }]}
      fill="none"
      height="14"
      viewBox="0 0 17 14"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.91974 7.35676L12.9741 3.80476C12.6203 3.28125 12.0316 2.96534 11.3997 2.95996H2.43974C1.80456 2.95968 1.21036 3.27356 0.852539 3.79836L6.91974 7.35676Z" />
      <path d="M7.55953 8.45771C7.36507 8.57051 7.14434 8.63011 6.91953 8.63051C6.69531 8.63206 6.47461 8.57468 6.27953 8.46411L0.519531 5.09131V11.2801C0.519531 12.3405 1.37914 13.2001 2.43953 13.2001H11.3995C12.4599 13.2001 13.3195 12.3405 13.3195 11.2801V5.09131L7.55953 8.45771Z" />
      <path
        className="fill-override"
        clipRule="evenodd"
        d="M11.7998 2.86006C11.7998 1.5898 12.8295 0.560059 14.0998 0.560059C14.7098 0.560059 15.2948 0.802379 15.7262 1.23371C16.1575 1.66505 16.3998 2.25006 16.3998 2.86006C16.3998 4.13031 15.3701 5.16006 14.0998 5.16006C12.8295 5.16006 11.7998 4.13031 11.7998 2.86006ZM13.8033 3.71336L15.1833 2.33336C15.2735 2.24317 15.2735 2.09695 15.1833 2.00676C15.0931 1.91657 14.9469 1.91657 14.8567 2.00676L13.64 3.22576L13.3433 2.92676C13.2849 2.86842 13.1999 2.84563 13.1202 2.86699C13.0405 2.88834 12.9783 2.95059 12.9569 3.03029C12.9355 3.10998 12.9583 3.19502 13.0167 3.25336L13.4767 3.71336C13.5199 3.7569 13.5786 3.78139 13.64 3.78139C13.7013 3.78139 13.7601 3.7569 13.8033 3.71336Z"
        fill={theme.palette.success.main}
        fillRule="evenodd"
      />
    </svg>
  );
};