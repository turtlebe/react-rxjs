import { useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import { Card } from '../Card';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

export type BreadcrumbItems = [BreadcrumbItem, BreadcrumbItem, ...BreadcrumbItem[]];

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItems;
  progress: number;
}

const style = (theme: Theme) =>
  css({
    minHeight: theme.spacing(9.5),
    width: '100%',
    position: 'relative',
  });

const lineStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: theme.spacing(2.875),
    left: theme.spacing(5.625),
    right: theme.spacing(5.625),
    height: 1,
    zIndex: 1,
    borderTop: `1px solid ${theme.palette.divider}`,
  });

const listStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  marginBlock: 0,
  marginInline: 0,
  paddingInline: 0,
  listStyle: 'none',

  '& li': {
    zIndex: 2,
  },
});

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs, progress } = props;

  const items = useMemo(
    () =>
      breadcrumbs.map((crumb, index) => (
        <Breadcrumb {...crumb} key={crumb.path} position={index} progress={progress} />
      )),
    [breadcrumbs, progress]
  );

  return (
    <Card css={style}>
      <span css={lineStyle} />
      <ol css={listStyle}>{items}</ol>
    </Card>
  );
};
