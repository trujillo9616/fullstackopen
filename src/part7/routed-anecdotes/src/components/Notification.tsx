import React from "react";

interface NotificationProps {
  notification: string;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div>
      <h2>{notification}</h2>
    </div>
  );
};

export default Notification;
