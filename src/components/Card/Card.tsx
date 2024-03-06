import { forwardRef, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';
import { Typography } from 'components/Typography';

export interface CardProps extends MuiCardProps {
  color?: 'primary' | 'secondary' | 'tertiary';
  headerButton?: ReactNode;
  isStatusCard?: boolean;
  subtitle?: string;
  title?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4';
}

const style =
  (color: 'primary' | 'secondary' | 'tertiary', isStatusCard: boolean) => (theme: Theme) =>
    css({
      padding: theme.spacing(1.25),
      zIndex: '10',
      marginLeft: isStatusCard ? theme.spacing(-2.845) : theme.spacing(0),
      background:
        color === 'primary'
          ? theme.palette.primary.faded
          : color === 'secondary'
          ? theme.palette.background.paper
          : theme.palette.background.default,

      '&.MuiPaper-outlined': {
        background: theme.palette.background.default,
      },
    });

const headerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    height: theme.spacing(3),
  });

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    color = 'secondary',
    elevation,
    headerButton,
    isStatusCard = false,
    subtitle,
    title,
    titleVariant = 'h4',
    variant,
    ...rest
  } = props;

  return (
    <MuiCard
      css={style(color, isStatusCard)}
      elevation={variant !== 'elevation' ? 0 : elevation}
      ref={ref}
      variant={variant}
      {...rest}
    >
      {(title || headerButton) && (
        <div css={headerStyle}>
          {title && (
            <Typography
              css={(theme) => ({ marginBottom: theme.spacing(0.5) })}
              variant={titleVariant}
            >
              {title}
            </Typography>
          )}
          {headerButton && <div>{headerButton}</div>}
        </div>
      )}
      {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      {children}
    </MuiCard>
  );
});
