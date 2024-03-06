import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';
import { Card, CardProps } from './Card';

export interface CardSectionProps extends Pick<CardProps, 'color'> {
  children: ReactNode;
  className?: string;
  rightHeaderElement?: ReactNode;
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

export const CardSection = (props: CardSectionProps) => {
  const { children, className, color, rightHeaderElement, title } = props;

  return (
    <div className={className} css={style}>
      <div css={headerStyle}>
        <Typography variant="h3">{title}</Typography>
        {rightHeaderElement}
      </div>
      <Card color={color}>{children}</Card>
    </div>
  );
};
