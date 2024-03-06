import { AlertColor } from '@mui/material/Alert';
import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';

export interface Notification {
  message: string;
  translate?: boolean;
  type: AlertColor;
}

const [notifications$, raiseNotification] = createSignal<Notification>();
export { raiseNotification };

const [useNotifications] = bind(notifications$, undefined);
export { useNotifications };
