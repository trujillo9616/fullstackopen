import { useState, useEffect, useRef } from "react";
import {
  BlogPost,
  LoginForm,
  Notification,
  PostForm,
  Toggable,
} from "./components";
import { blogPostService, loginService } from "./services";
import {
  BlogPost as BlogPostType,
  Notification as NotificationType,
  LoginResponse,
  BlogPostInfo,
} from "./types";

function App() {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    type: "",
  });
  const postFormRef = useRef<{ toggleVisibility: () => void }>();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogPostService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setNotification({
        message: "Wrong username or password",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createNewBlogPost = async (newBlogPost: BlogPostInfo) => {
    try {
      const response = await blogPostService.create(newBlogPost);
      setBlogPosts(blogPosts.concat(response));
      postFormRef?.current?.toggleVisibility();
      setNotification({
        message: `Blog post ${response.title} added`,
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setNotification({
        message: "Error adding blog post",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  const updateBlogPostLikes = async (id: string) => {
    try {
      const response = await blogPostService.get(id);
      const updatedBlogPost = {
        ...response,
        likes: response.likes + 1,
      };
      const updatedResponse = await blogPostService.update(id, updatedBlogPost);
      setBlogPosts(
        blogPosts.map((blogPost) =>
          blogPost.id === id ? updatedResponse : blogPost
        )
      );
    } catch (exception) {
      console.log(exception);
      setNotification({
        message: "Error updating blog post",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  const removeBlogPost = async (id: string) => {
    try {
      await blogPostService.remove(id);
      setBlogPosts(blogPosts.filter((blogPost) => blogPost.id !== id));
    } catch (exception) {
      console.log(exception);
      setNotification({
        message: "Error deleting blog post",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);
    }
  };

  const postForm = () => (
    <Toggable buttonLabel="new blog post" ref={postFormRef}>
      <PostForm createNewBlogPost={createNewBlogPost} />
    </Toggable>
  );

  const sort = (blogPosts: BlogPostType[]) => {
    return blogPosts.sort((a, b) => b.likes - a.likes);
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const blogPosts = await blogPostService.getAll();
      const sortedBlogPosts = sort(blogPosts);
      setBlogPosts(sortedBlogPosts);
    };
    fetchBlogPosts();

    return () => {
      setBlogPosts([]);
    };
  }, []);

  useEffect(() => {
    const refetchBlogPosts = async () => {
      const blogPosts = await blogPostService.getAll();
      const sortedBlogPosts = sort(blogPosts);
      setBlogPosts(sortedBlogPosts);
    };
    refetchBlogPosts();
  }, [notification]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogPostService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const sortedBlogPosts = blogPosts.sort((a, b) => b.likes - a.likes);
    setBlogPosts(sortedBlogPosts);
  }, [blogPosts]);

  return (
    <div>
      <h2>Blog Posts</h2>
      <Notification notification={notification} />
      {user === null ? (
        <Toggable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
          />
        </Toggable>
      ) : (
        <>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {user !== null && postForm()}
      <div id="posts-list">
        {blogPosts.map((blogPost) => (
          <BlogPost
            key={blogPost.id}
            blog={blogPost}
            updateBlogPostLikes={updateBlogPostLikes}
            removeBlogPost={removeBlogPost}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
