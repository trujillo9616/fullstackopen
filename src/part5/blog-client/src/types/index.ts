export interface BlogPostInfo {
  title: string;
  url: string;
}

export interface BlogPost extends BlogPostInfo {
  author?: string;
  likes: number;
  id: string;
  date: string;
  user: {
    username: string;
    name: string;
    id: string;
  }
}

export interface Notification {
  message: string;
  type: string;
}

export interface LoginResponse {
  username: string;
  name: string;
  token: string;
}
