"use client";

import strings from "./strings.json";
import useNotificationFactoryContext from "./hooks/useNotificationFactoryContext";

const NotificationFactory: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { notification, setNotification } = useNotificationFactoryContext();

  const clearNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <div>
          {notification.message || strings.genericMessages[notification.type]}
          <button onClick={clearNotification}>
            {strings.clearNotificationAltText}
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default NotificationFactory;
