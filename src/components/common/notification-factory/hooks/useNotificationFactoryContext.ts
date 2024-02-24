import { useContext } from "react";
import { NotificationFactoryContext } from "./notification-factory-context";

const useNotificationFactoryContext = () => {
  return useContext(NotificationFactoryContext);
};

export default useNotificationFactoryContext;
