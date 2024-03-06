import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { Card, CardProps } from './Card';

export interface CardSectionStatusCardProps extends Pick<CardProps, 'color'> {
  children: ReactNode;
  className?: string;
  title: string;
}

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
});

const headerStyle = (theme: Theme) =>
  css({
    marginBottom: theme.spacing(1.25),
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  });

const cardBox = (theme: Theme) =>
  css({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    display: 'flex',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  });

const verticalDividerStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    bottom: 0,
    top: 0,
    borderLeft: `.5px solid ${theme.palette.secondary.main}`,
    zIndex: '-1',
    marginLeft: theme.spacing(1.535),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  });

export const CardSectionStatusCard = (props: CardSectionStatusCardProps) => {
  const { children, className, title } = props;

  return (
    <div className={className} css={style}>
      <div css={headerStyle}>
        <Typography variant="h3">{title}</Typography>
      </div>
      <Card>
        <div css={cardBox}>
          <div css={verticalDividerStyle} />
          <div>{children}</div>
        </div>
      </Card>
    </div>
  );
};
