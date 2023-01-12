import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogPost from "./";

const mockBlogPost = {
  id: "23452345",
  title: "Test title",
  author: "Test author",
  url: "http://test.com",
  likes: 0,
  date: "2020-01-01T00:00:00.000Z",
  user: {
    id: "12341234",
    username: "test",
    name: "Test User",
  },
};

const mockUser = {
  id: "12341234",
  username: "test",
  name: "Test User",
  token: "12341234",
};

describe("<BlogPost />", () => {
  test("renders component", () => {
    render(
      <BlogPost
        blog={mockBlogPost}
        user={mockUser}
        updateBlogPostLikes={() => console.log("update")}
        removeBlogPost={() => console.log("remove")}
      />
    );
    const element = screen.getByText("Test title by Test author");
    expect(element).toBeDefined();
    const viewButton = screen.getByText("view");
    expect(viewButton).toBeDefined();
  });

  test("clicking the view button shows the post information", async () => {
    const mockUpdateLikes = jest.fn();

    render(
      <BlogPost
        blog={mockBlogPost}
        user={null}
        updateBlogPostLikes={mockUpdateLikes}
        removeBlogPost={() => console.log("remove")}
      />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const urlElement = screen.getByText("http://test.com");
    expect(urlElement).toBeDefined();
    const likesElement = screen.getByText(/likes/);
    expect(likesElement).toBeDefined();
    const authorElement = screen.getByText(/added by/);
    expect(authorElement).toBeDefined();
    const dateElement = screen.getByText(/posted on/);
    expect(dateElement).toBeDefined();
    const likeButton = screen.getByText("like");
    expect(likeButton).toBeDefined();
    await user.click(likeButton);
    expect(mockUpdateLikes).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("remove")).not.toBeInTheDocument();
  });

  test("clicking the view button shows the remove button if the user is the author", async () => {
    render(
      <BlogPost
        blog={mockBlogPost}
        user={mockUser}
        updateBlogPostLikes={() => console.log("update")}
        removeBlogPost={() => console.log("remove")}
      />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const removeButton = screen.getByText("remove");
    expect(removeButton).toBeDefined();
  });

  test("clicking on the hide button hides the post information", async () => {
    render(
      <BlogPost
        blog={mockBlogPost}
        user={null}
        updateBlogPostLikes={() => console.log("update")}
        removeBlogPost={() => console.log("remove")}
      />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const hideButton = screen.getByText("hide");
    await user.click(hideButton);
    expect(screen.queryByText("http://test.com")).not.toBeInTheDocument();
    expect(screen.queryByText(/likes/)).not.toBeInTheDocument();
    expect(screen.queryByText(/added by/)).not.toBeInTheDocument();
    expect(screen.queryByText(/posted on/)).not.toBeInTheDocument();
    expect(screen.queryByText("like")).not.toBeInTheDocument();
    expect(screen.queryByText("remove")).not.toBeInTheDocument();
  });

  test("clicking the remove button pops a confirmation window, removes it when true", async () => {
    window.confirm = jest.fn().mockImplementation(() => true);
    const mockRemoveHandler = jest.fn();
    render(
      <BlogPost
        blog={mockBlogPost}
        user={mockUser}
        updateBlogPostLikes={() => console.log("update")}
        removeBlogPost={mockRemoveHandler}
      />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const removeButton = screen.getByText("remove");
    await user.click(removeButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(mockRemoveHandler).toHaveBeenCalledTimes(1);
  });

  test("clicking the remove button pops a confirmation window, doesnt remove when false", async () => {
    window.confirm = jest.fn().mockImplementation(() => false);
    const mockRemoveHandler = jest.fn();
    render(
      <BlogPost
        blog={mockBlogPost}
        user={mockUser}
        updateBlogPostLikes={() => console.log("update")}
        removeBlogPost={mockRemoveHandler}
      />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const removeButton = screen.getByText("remove");
    await user.click(removeButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(mockRemoveHandler).toHaveBeenCalledTimes(0);
  });
});
