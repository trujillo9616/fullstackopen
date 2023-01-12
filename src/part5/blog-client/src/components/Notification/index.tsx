import React from "react";
import { Notification as NotificationType } from "../../types";
import "./notification.css";

interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (notification.message === null || notification.message === "") {
    return null;
  }

  return (
    <div className={notification.type} id="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
