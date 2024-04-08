import {
  useNotificationFactoryContext,
  NOTIFICATION_TYPES,
} from "@/components/notification-factory";
import strings from "./strings.json";

const TestNotificationButton = () => {
  const { setNotification } = useNotificationFactoryContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setNotification({ type: NOTIFICATION_TYPES.ERROR });
      }}
    >
      {strings.testGetAllFABCardsButtonCTA}
    </button>
  );
};

export default TestNotificationButton;
