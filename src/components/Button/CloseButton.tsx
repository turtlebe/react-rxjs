import { memo } from 'react';
import { Cross } from 'theme/icons';
import { IconButton } from './IconButton';

export interface CloseButtonProps {
  disabled?: boolean;
  isWhite?: boolean;
  onClick: () => void;
}

export const CloseButton = memo(({ isWhite, ...rest }: CloseButtonProps) => (
  <IconButton aria-label="close" {...rest}>
    <Cross
      css={(theme) => ({ color: isWhite ? theme.palette.primary.contrastText : 'currentcolor' })}
    />
  </IconButton>
));
