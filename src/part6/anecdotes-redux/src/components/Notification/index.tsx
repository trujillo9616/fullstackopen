import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectNotification } from "../../features/notifications/notificationSlice";

const Notification: React.FC = () => {
  const notification = useAppSelector(selectNotification);
  if (notification.message === "") return <></>;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
