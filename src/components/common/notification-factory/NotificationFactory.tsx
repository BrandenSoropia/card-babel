"use client";

import React, { useContext } from "react";
import { NotificationFactoryContext } from "./hooks/notification-factory-context";
import strings from "./strings.json";

const NotificationFactory: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { notification, setNotification } = useContext(
    NotificationFactoryContext
  );

  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <div>
          {notification.message}
          <button onSubmit={clearNotification}>
            {strings.clearNotificationAltText}
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default NotificationFactory;
