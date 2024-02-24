"use client";

import React, { useState } from "react";
import { Notification } from "./types";
import { NotificationFactoryContext } from "./hooks/notification-factory-context";

const NotificationFactoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <NotificationFactoryContext.Provider
      value={{ notification, setNotification }}
    >
      {children}
    </NotificationFactoryContext.Provider>
  );
};

export default NotificationFactoryProvider;
