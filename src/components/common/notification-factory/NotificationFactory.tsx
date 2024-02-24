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

  console.log("### NotificationFactory rendered!");

  return (
    <div>
      {notification && (
        <div>
          {notification.message || strings.genericMessages[notification.type]}
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
