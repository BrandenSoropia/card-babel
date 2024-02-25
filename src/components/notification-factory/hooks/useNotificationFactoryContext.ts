import { useContext } from "react";
import { NotificationFactoryContext } from "./notification-factory-context";
import NOTIFICATION_TYPES from "../constants";

const useNotificationFactoryContext = () => {
  return { ...useContext(NotificationFactoryContext), NOTIFICATION_TYPES };
};

export default useNotificationFactoryContext;
