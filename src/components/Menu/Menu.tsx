import { forwardRef } from 'react';
import { css, Theme } from '@emotion/react';
import { MenuItem, MenuItemProps } from './MenuItem';

export interface MenuProps {
  items: MenuItemProps[];
}

const menuWrapperStyle = (theme: Theme) =>
  css({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 1.6),
  });

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const { items } = props;
  return (
    <div css={menuWrapperStyle} ref={ref}>
      {items.map((item) => (
        <MenuItem key={item.text} {...item} />
      ))}
    </div>
  );
});
