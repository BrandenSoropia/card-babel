import NOTIFICATION_TYPES from "./constants";

/**
 * Enforce we have types on notifications so
 * we may style them accordingly.
 *
 * Optional message because we might want to override messages in future.
 */
export type Notification = {
  type: keyof typeof NOTIFICATION_TYPES;
  message?: string;
};

export type NotificationContext = {
  notification: Notification | null;
  setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
};
