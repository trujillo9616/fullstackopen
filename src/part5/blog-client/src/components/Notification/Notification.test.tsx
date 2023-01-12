import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Notification from "./";

const mockNotificationSuccess = {
  message: "Test message",
  type: "success",
};

const mockNotificationError = {
  message: "Test message",
  type: "error",
};

const mockNotificationInfo = {
  message: "Test message",
  type: "info",
};

describe("<Notification />", () => {
  test("renders the notification", async () => {
    render(<Notification notification={mockNotificationSuccess} />);
    const notification = screen.getByText("Test message");
    expect(notification).toBeInTheDocument();
  });

  test("renders a success notification with the correct class", async () => {
    render(<Notification notification={mockNotificationSuccess} />);
    const notification = screen.getByText("Test message");
    expect(notification).toHaveClass("success");
  });

  test("renders an error notification with the correct class", async () => {
    render(<Notification notification={mockNotificationError} />);
    const notification = screen.getByText("Test message");
    expect(notification).toHaveClass("error");
  });

  test("renders a info notification with the correct class", async () => {
    render(<Notification notification={mockNotificationInfo} />);
    const notification = screen.getByText("Test message");
    expect(notification).toHaveClass("info");
  });

  test("does not render the notification if the message is empty", async () => {
    render(<Notification notification={{ message: "", type: "success" }} />);
    const notification = screen.queryByText("Test message");
    expect(notification).not.toBeInTheDocument();
  });
});
