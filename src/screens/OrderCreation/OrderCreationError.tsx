import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorPage } from 'screens/ErrorPage';

export const OrderCreationError = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleAction = useCallback(() => {
    navigate(state.to);
  }, [navigate, state]);

  return (
    <ErrorPage
      actionText={state.actionText}
      description={state.description}
      title={state.title}
      onAction={handleAction}
    />
  );
};
