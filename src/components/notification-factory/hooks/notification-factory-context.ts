import { createContext } from "react";
import { NotificationContext } from "../types";

export const NotificationFactoryContext = createContext<NotificationContext>({
  notification: null,
  setNotification: () => {},
});
