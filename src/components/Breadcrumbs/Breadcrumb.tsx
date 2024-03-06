import { css, Theme } from '@emotion/react';
import { NavLink } from 'react-router-dom';
import { Typography } from 'components/Typography';
import gradients from '../../theme/gradients';
import { CheckBold } from '../../theme/icons';
import { IconCircle } from '../IconCircle';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface BreadcrumbProps extends BreadcrumbItem {
  position: number;
  progress: number;
}

const style = (disabled: boolean) => (theme: Theme) =>
  css({
    width: theme.spacing(10),
    overflow: 'visible',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
    wordSpacing: theme.spacing(10),
    textAlign: 'center',
    userSelect: 'none',

    ...(disabled && {
      color: theme.palette.secondary.light,
      pointerEvents: 'none',
    }),

    '&.active span': {
      fontWeight: 600,
    },

    '&:not(.active):hover div': {
      boxShadow: `0px 0px ${theme.spacing(1)} 0px ${theme.palette.primary.main}`,
    },
  });

const circleStyle = (disabled: boolean) => (theme: Theme) =>
  css({
    background: gradients.ForestGradient,
    fontSize: theme.typography.subtitle1.fontSize,
    padding: 0,
    height: theme.spacing(3.125),
    width: theme.spacing(3.125),
    marginBottom: theme.spacing(0.625),

    ...(disabled && {
      background: theme.palette.background.default,
      color: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.light}`,
    }),
  });

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { label, path, position, progress } = props;

  const disabled = progress < position;
  const content =
    progress > position ? <CheckBold /> : <Typography variant="h4">{position + 1}</Typography>;

  return (
    <li css={{ listStyle: 'none' }}>
      <NavLink css={style(disabled)} tabIndex={disabled ? -1 : undefined} to={path}>
        <IconCircle css={circleStyle(disabled)}>{content}</IconCircle>
        <Typography variant="caption">{label}</Typography>
      </NavLink>
    </li>
  );
};
