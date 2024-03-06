import { forwardRef, ReactElement, ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { css, Theme } from '@emotion/react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import { Typography } from 'components/Typography';
import { ArrowDown } from 'theme/icons';

export interface MenuItemProps {
  borderBottom?: boolean;
  details?: ReactNode;
  leftIcon?: ReactElement;
  onClickItem?: () => void;
  rightIcon?: ReactElement;
  text?: string;
  textColor?: 'main' | 'primary' | 'secondary';
}

const accordionStyle = (borderBottom: boolean) => (theme: Theme) =>
  css({
    ...(borderBottom && {
      borderBottom: `0.5px solid ${theme.palette.divider}`,
    }),
    '&:last-child': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  });

const accordionSummaryStyle = css({
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: 0,
  },
});

const itemWrapperStyle = (borderBottom: boolean, textColor: string) => (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1.6),
    padding: theme.spacing(1.6, 0),
    ...(borderBottom && {
      borderBottom: `0.5px solid ${theme.palette.divider}`,
    }),
    cursor: 'pointer',
    color:
      textColor === 'main'
        ? theme.palette.primary.main
        : textColor === 'primary'
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
  });
const leftWrapperStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.6),
    flex: 1,
  });

const AccordionSummary = (props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowDown />} {...props} css={accordionSummaryStyle} />
);

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const {
    borderBottom = false,
    details,
    leftIcon,
    onClickItem,
    rightIcon,
    text,
    textColor = 'secondary',
  } = props;
  if (details) {
    return (
      <Accordion disableGutters css={accordionStyle(borderBottom)} elevation={0} ref={ref}>
        <AccordionSummary>
          <Typography variant="body1">{text}</Typography>
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    );
  }
  return (
    <Box
      component="div"
      css={itemWrapperStyle(borderBottom, textColor)}
      ref={ref}
      onClick={onClickItem}
    >
      <div css={leftWrapperStyle}>
        {leftIcon}
        <Typography
          variant="body1"
          css={(theme) => ({
            color:
              textColor === 'main'
                ? theme.palette.primary.main
                : textColor === 'primary'
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
          })}
        >
          {text}
        </Typography>
      </div>
      {rightIcon}
    </Box>
  );
});
