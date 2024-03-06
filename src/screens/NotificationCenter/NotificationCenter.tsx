import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Snackbar } from 'components/Snackbar';
import { useNotifications } from 'state/notifications';

export const NotificationCenter = memo(() => {
  const { t } = useTranslation();
  const notification = useNotifications();

  const alert = useMemo(
    () =>
      notification ? (
        <Alert severity={notification.type}>
          {notification.translate ? t(notification.message) : notification.message}
        </Alert>
      ) : undefined,
    [notification, t]
  );

  return <Snackbar>{alert}</Snackbar>;
});
