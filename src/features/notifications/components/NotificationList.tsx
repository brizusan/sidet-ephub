import { formatCreatedDate } from "@/src/shared/utils/date";
import { SelectNotification } from "../types/notification.types";

type Props = {
  notifications: SelectNotification[];
};

export default function NotificationList({ notifications }: Props) {
  return (
    <div className=" space-y-4 mt-10">
      {notifications.length ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 shadow-xs shadow-gray-300 rounded"
          >
            <p>
              {notification.actorName} - {notification.message}{" "}
              <span className="font-semibold">{notification.target}</span>
            </p>

            <p className="text-sm text-gray-500">
              {formatCreatedDate(notification.createdAt)}
            </p>
          </div>
        ))
      ) : (
        <>
          <p className="text-center mt-10 text-lg text-gray-600 font-semibold">
            No tenemos Notificaciones
          </p>
        </>
      )}
    </div>
  );
}
