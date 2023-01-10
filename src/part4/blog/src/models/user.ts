import mongoose from 'mongoose';
import { PostType } from './post';

export interface UserType {
  id?: string;
  username: string;
  name: string;
  passwordHash?: string;
  posts: PostType[];
}

const userSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
