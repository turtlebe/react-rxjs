import { memo, useCallback } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { IconButton } from 'components/Button';
import { Pen } from 'theme/icons';

export interface EditButtonProps {
  to: To;
}

export const EditButton = memo((props: EditButtonProps) => {
  const { to } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(to);
  }, [navigate, to]);

  return (
    <IconButton role="link" onClick={handleClick}>
      <Pen />
    </IconButton>
  );
});
