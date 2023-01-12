import React, { useState } from "react";
import { BlogPostInfo } from "../../types";

interface PostFormProps {
  createNewBlogPost: (newBlogPost: BlogPostInfo) => void;
}

const PostForm: React.FC<PostFormProps> = ({ createNewBlogPost }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewBlogPost({ title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blog post</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" id="create-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default PostForm;
