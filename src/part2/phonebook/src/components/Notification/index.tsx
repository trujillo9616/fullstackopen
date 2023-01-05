import React from "react";
import "./index.css";
import { NotificationType } from "../../types";

interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (notification.message === null || notification.message === "") {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
