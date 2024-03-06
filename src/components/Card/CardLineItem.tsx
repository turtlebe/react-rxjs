import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import Box from '@mui/material/Box';
import { Typography } from 'components/Typography';

export interface CardLineItemProps {
  isDocumentItem?: boolean;
  label: ReactNode;
  labelMinWidth?: number;
  onClick?: () => void;
  primaryValue?: boolean;
  space?: 'medium' | 'small';
  value?: ReactNode;
  valueAlignment?: 'left' | 'right';
}

const style = (clickable: boolean, space: 'medium' | 'small') => (theme: Theme) =>
  css({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: theme.spacing(1.25),
    justifyContent: 'center',
    cursor: clickable ? 'pointer' : 'default',
    padding: space === 'medium' ? theme.spacing(1.5, 0) : theme.spacing(0.7, 0),

    '&:not(:last-child)': {
      borderBottom: `.5px solid ${theme.palette.divider}`,
    },

    '&:first-of-type': {
      marginTop: space === 'medium' ? theme.spacing(-1.5) : theme.spacing(-1),
    },

    '&:last-of-type': {
      marginBottom: space === 'medium' ? theme.spacing(-1.5) : theme.spacing(-1),
    },
  });

const labelStyle = (labelMinWidth: number, isDocumentItem: boolean) => (theme: Theme) =>
  css({
    minWidth: theme.spacing(labelMinWidth),
    alignSelf: 'start',

    ...(isDocumentItem && {
      paddingTop: theme.spacing(0.75),
    }),
  });

const valueStyle = (valueAlignment: 'left' | 'right', primaryValue: boolean) => (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 0,
    padding: 0,

    ...(primaryValue && {
      color: theme.palette.primary.main,
    }),

    ...(valueAlignment === 'right' && {
      marginLeft: 'auto',
      marginRight: 0,
      marginBottom: 'auto',
      textAlign: 'right',
    }),
  });

export const CardLineItem = (props: CardLineItemProps) => {
  const {
    isDocumentItem = false,
    label,
    labelMinWidth = 13.75,
    onClick,
    primaryValue = false,
    space = 'medium',
    value,
    valueAlignment = 'left',
  } = props;

  return (
    <Box css={style(!!onClick, space)} onClick={onClick}>
      <div css={labelStyle(labelMinWidth, isDocumentItem)}>
        {typeof label === 'string' ? <Typography variant="body2">{label}</Typography> : label}
      </div>
      {value && (
        <div css={valueStyle(valueAlignment, primaryValue)}>
          {typeof value === 'string' ? <Typography variant="h5">{value}</Typography> : value}
        </div>
      )}
    </Box>
  );
};
