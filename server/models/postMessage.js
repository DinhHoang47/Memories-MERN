import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  tags: [],
  selectedFile: String,
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
