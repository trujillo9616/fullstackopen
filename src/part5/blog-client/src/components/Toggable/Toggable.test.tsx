/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggable from "./";

describe("<Toggable />", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <Toggable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Toggable>
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });

  test("at the start the children are not displayed", async () => {
    const div = container.querySelector(".toggableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".toggableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const closeButton = screen.getByText("cancel");
    await user.click(closeButton);

    const div = container.querySelector(".toggableContent");
    expect(div).toHaveStyle("display: none");
  });
});
