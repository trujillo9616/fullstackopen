import mongoose from "mongoose";
import { UserType } from "./user";

export interface PostType {
  id?: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: UserType;
  date?: Date;
}

const postSchema = new mongoose.Schema<PostType>({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
  },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

postSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Post = mongoose.model<PostType>("Post", postSchema);

export default Post;
