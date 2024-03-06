import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';

export interface UserAvatarProps {
  avatarUrl: string;
  name?: string;
}

const containerStyle = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
});

const avatarStyle = (avatarUrl: string) => (theme: Theme) =>
  css({
    height: 80,
    width: 230,
    borderRadius: 10,
    padding: 5,
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.background.side}`,
    boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.05)`,
    backgroundImage: `url(${avatarUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundOrigin: 'content-box',
    marginBottom: theme.spacing(1),
  });

export const CompanyAvatar = forwardRef<HTMLDivElement, UserAvatarProps>((props, ref) => {
  const { avatarUrl, name } = props;

  return (
    <div css={containerStyle} ref={ref}>
      <div css={avatarStyle(avatarUrl)} />
      {name && (
        <Typography css={{ lineHeight: 1.375 }} variant="h4">
          {name}
        </Typography>
      )}
    </div>
  );
});
