import {
  useNotificationFactoryContext,
  NOTIFICATION_TYPES,
} from "@/components/common/notification-factory";

const TestNotificationButton = () => {
  const { setNotification } = useNotificationFactoryContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setNotification({ type: NOTIFICATION_TYPES.ERROR });
      }}
    >
      Test Notification System
    </button>
  );
};

export default TestNotificationButton;
