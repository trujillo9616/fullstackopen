/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "./";

describe("<PostForm />", () => {
  let createNewBlogPost: jest.Mock;

  beforeEach(() => {
    createNewBlogPost = jest.fn();
    render(<PostForm createNewBlogPost={createNewBlogPost} />);
  });

  test("renders the form", async () => {
    const titleInput = screen.getByRole("textbox", { name: "Title" });
    const urlInput = screen.getByRole("textbox", { name: "URL" });
    const createButton = screen.getByRole("button", { name: "Create" });
    expect(titleInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  test("calls the createNewBlogPost function with the correct date", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByRole("textbox", { name: "Title" });
    const urlInput = screen.getByRole("textbox", { name: "URL" });
    const createButton = screen.getByRole("button", { name: "Create" });

    await user.type(titleInput, "Test title");
    await user.type(urlInput, "http://test.com");
    await user.click(createButton);

    expect(createNewBlogPost).toHaveBeenCalledTimes(1);
    expect(createNewBlogPost).toHaveBeenCalledWith({
      title: "Test title",
      url: "http://test.com",
    });
  });
});
