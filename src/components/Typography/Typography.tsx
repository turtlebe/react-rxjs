import { css } from '@emotion/react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

export type TypographyProps = MuiTypographyProps;

const style = css({
  '& > p:first-of-type': {
    marginBlockStart: 0,
  },

  '& > p:last-of-type': {
    marginBlockEnd: 0,
  },
});

// add the `typeof MuiTypography` here so that `component` prop is valid
export const Typography: typeof MuiTypography = (props: TypographyProps) => (
  <MuiTypography css={style} {...props} />
);
