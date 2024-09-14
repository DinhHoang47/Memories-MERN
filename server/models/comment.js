import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
