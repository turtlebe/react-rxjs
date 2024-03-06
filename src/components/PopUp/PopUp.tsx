import { forwardRef, ReactNode } from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import { css, Theme } from '@emotion/react';
import { Typography } from 'components/Typography';

export interface PopUpProps extends Omit<ModalProps, 'children'> {
  body?: ReactNode;
  footer?: ReactNode;
  open: boolean;
  title: string;
  titleSize?: 'h1' | 'h2' | 'h3' | 'h4';
}

const modalStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2.5),
    gap: theme.spacing(1.25),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    width: theme.spacing(40.5),
    minHeight: '185px',
    outline: 'none',

    [theme.breakpoints.down('md')]: {
      width: `calc(100vw - ${theme.spacing(8.5)})`,
    },
  });

export const PopUp = forwardRef<HTMLDivElement, PopUpProps>((props, ref) => {
  const { body, footer, title, titleSize = 'h3', ...rest } = props;

  return (
    <Modal ref={ref} {...rest}>
      <div css={modalStyle}>
        <Typography css={(theme) => ({ color: theme.palette.text.primary })} variant={titleSize}>
          {title}
        </Typography>
        {typeof body === 'string' ? (
          <Typography css={(theme) => ({ color: theme.palette.text.secondary })} variant="body1">
            {body}
          </Typography>
        ) : (
          body
        )}
        {footer}
      </div>
    </Modal>
  );
});
