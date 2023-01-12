import React, { useState } from "react";
import { BlogPost as BlogPostType, LoginResponse } from "../../types";

interface BlogPostProps {
  blog: BlogPostType;
  user: LoginResponse | null;
  updateBlogPostLikes: (id: string) => void;
  removeBlogPost: (id: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({
  blog,
  user,
  updateBlogPostLikes,
  removeBlogPost,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRemove = (id: string) => {
    if (window.confirm(`Remove blog post ${blog.title} by ${blog.author}?`)) {
      removeBlogPost(id);
    }
  };

  const removeButton = () => {
    if (blog.user.username === user?.username) {
      return <button onClick={() => handleRemove(blog.id)}>remove</button>;
    }
    return null;
  };

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? "hide" : "view"}
      </button>
      {showInfo ? (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes{" "}
            <button onClick={() => updateBlogPostLikes(blog.id)}>like</button>
          </p>
          <p>added by {blog.author}</p>
          <p>posted on {blog.date}</p>
          {removeButton()}
        </div>
      ) : null}
    </div>
  );
};

export default BlogPost;
