import { css } from '@emotion/react';

export const iconFontStyle = css({
  width: '1em',
  height: '1em',
});

export const iconStyle = css(iconFontStyle, {
  '& path:not(.fill-override)': {
    fill: 'currentcolor',
  },
  '& circle:not(.fill-override)': {
    fill: 'currentcolor',
  },
});

export const iconStyleWithStroke = css(iconStyle, {
  '& path': {
    stroke: 'currentcolor',
  },
});
