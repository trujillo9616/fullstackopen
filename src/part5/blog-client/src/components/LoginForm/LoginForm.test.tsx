/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./";

describe("<LoginForm />", () => {
  let username: string;
  let password: string;
  let handleUsernameChange: jest.Mock;
  let handlePasswordChange: jest.Mock;
  let handleSubmit: jest.Mock;

  beforeEach(() => {
    username = "";
    password = "";
    handleUsernameChange = jest.fn();
    handlePasswordChange = jest.fn();
    handleSubmit = jest.fn((e) => e.preventDefault());

    render(
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    );
  });

  test("renders the form", async () => {
    const usernameInput = screen.getByRole("textbox", { name: "Username" });
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "login" });
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("calls the handleUsernameChange when username input changes", async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByRole("textbox", { name: "Username" });
    await user.type(usernameInput, "testuser");
    expect(handleUsernameChange).toHaveBeenCalledTimes(8);
  });

  test("calls the handlePasswordChange when password input changes", async () => {
    const user = userEvent.setup();
    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "testpassword");
    expect(handlePasswordChange).toHaveBeenCalledTimes(12);
  });

  test("calls the handleSubmit when the form is submitted", async () => {
    const user = userEvent.setup();
    const loginButton = screen.getByRole("button", { name: "login" });
    await user.click(loginButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
