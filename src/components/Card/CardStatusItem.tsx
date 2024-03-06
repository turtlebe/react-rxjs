import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import Box from '@mui/material/Box';
import { Typography } from 'components/Typography';
import { IconCircle } from 'components/IconCircle';
import { Check, Dot } from 'theme/icons';

export interface CardStatusItemProps {
  isCompleted?: boolean;
  label: ReactNode;
  labelMinWidth?: number;
  onClick?: () => void;
  space?: 'medium' | 'small';
  value?: ReactNode;
}

const style = (clickable: boolean, space: 'medium' | 'small') => (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr',
    alignItems: 'center',
    columnGap: theme.spacing(1.25),
    cursor: clickable ? 'pointer' : 'default',
    padding: space === 'medium' ? theme.spacing(1, 0) : theme.spacing(1, 0),

    '&:first-of-type': {
      marginTop: space === 'medium' ? theme.spacing(-1.5) : theme.spacing(-1),
    },

    '&:last-of-type': {
      marginBottom: space === 'medium' ? theme.spacing(-1.5) : theme.spacing(-1),
    },
  });

const circleStyle = (isCompleted: boolean) => (theme: Theme) =>
  css({
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.subtitle1.fontSize,
    padding: 0,
    zIndex: '10',
    height: theme.spacing(3.125),
    width: theme.spacing(3.125),

    ...(isCompleted && {
      background: theme.palette.success.light,
      color: theme.palette.primary.main,
    }),
  });

const labelStyle = (labelMinWidth: number) => (theme: Theme) =>
  css({
    minWidth: theme.spacing(labelMinWidth),
  });

const valueStyle = (isLink: boolean) => () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    position: 'relative',

    ...(isLink && {
      textDecoration: 'underline',
    }),
  });

export const CardStatusItem = (props: CardStatusItemProps) => {
  const {
    isCompleted = false,
    label,
    labelMinWidth = 17.0,
    onClick,
    space = 'medium',
    value,
  } = props;

  const isLink = !!onClick;

  return (
    <Box css={style(!!onClick, space)} onClick={onClick}>
      <div>
        <IconCircle css={circleStyle(isCompleted)}>{isCompleted ? <Check /> : <Dot />}</IconCircle>
      </div>
      <div css={labelStyle(labelMinWidth)}>
        {typeof label === 'string' ? <Typography variant="body2">{label}</Typography> : label}
      </div>
      {value && (
        <div css={valueStyle(isLink)}>
          {typeof value === 'string' ? <Typography variant="h5">{value}</Typography> : value}
        </div>
      )}
    </Box>
  );
};
