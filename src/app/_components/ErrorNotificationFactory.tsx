import React, { createContext, useState } from "react";

// TODO: Create a toast message system to handle any errors by floating them up via context
// Once working, throw this into layout so it's available everywhere!
const ErrorFactoryContext = createContext(null);

type ErrorNotification = {
  type: string;
  message: string;
};

const ErrorNotificationFactory: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [error, setError] = useState<ErrorNotification | null>(null);

  const clearNotification = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <div>
          {error.message}
          <button onSubmit={clearNotification}>Clear Notification</button>
        </div>
      )}
      {children}
    </div>
  );
};
