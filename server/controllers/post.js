import Comment from "../models/comment.js";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// CONST define

const LIMIT = 10;

// POSTS END POINTS

export const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;
    // get title as searchQuery case in-sensitive
    const title = new RegExp(searchQuery, "i");
    const query = { $or: [{ title }] };
    if (tags !== "") {
      query.$or.push({ tags: { $in: tags.split(",") } });
    }
    const posts = await PostMessage.find(query);

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { page, name } = req.query;
    // Get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    // Get total post in order to get total pages later
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(LIMIT);
    res.json({
      data: posts,
      numberOfPages: Math.ceil(total / LIMIT),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: "Post not found" });
    }
    const post = await PostMessage.findById(_id).populate({
      path: "comments", // Populate the comments array
      populate: { path: "author", select: "name" }, // Populate the author field inside each comment
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    // Get id post's id from req object
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Post Id not found");
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    // Get id post's form req object
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Post Id not found");
    }

    await PostMessage.findByIdAndRemove(_id);
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyPosts = async (req, res) => {
  const { page } = req.params;
  const userId = req.userId;
  // Check if userId valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid UserId");
  }
  try {
    const totalPages = await PostMessage.countDocuments({ creator: userId });
    const posts = await PostMessage.find({ creator: userId }).sort({
      createdAt: -1,
    });
    res.json({
      data: posts,
      numberOfPages: Math.ceil(totalPages / LIMIT),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLikedPosts = async (req, res) => {
  const { page = 1 } = req.params;
  const userId = req.userId;
  // Check if userId valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid UserId");
  }
  try {
    // Get user liked posts by populate
    const user = await User.findById(userId).populate("likedPosts");
    console.log("user: ", user);
    const totalPages = user.likedPosts.length;
    // Get user's liked posts
    const posts = user.likedPosts.slice((page - 1) * LIMIT, page * LIMIT);
    res.json({
      data: posts,
      numberOfPages: Math.ceil(totalPages / LIMIT),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(404).send("Post Id not found");
    }

    const post = await PostMessage.findById(id);
    const user = await User.findById(userId);

    const index = post.likes.findIndex(
      (currentId) => currentId === String(req.userId)
    );
    // Find if user id exists in likes array . If true push else remove id
    if (index === -1) {
      post.likes.push(req.userId);
      user.likedPosts.push(id);
    } else {
      const likedIndex = user.likedPosts.indexOf(id);
      user.likedPosts.splice(likedIndex, 1);
      post.likes = post.likes.filter(
        (currentId) => currentId !== String(req.userId)
      );
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    res.status(200).json({ updatedPost, updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Post Id not found");
    }

    // Step 1: Create a new comment
    const newComment = new Comment({
      author: userId, // Reference the user who created the comment
      content: comment,
    });

    const savedComment = await newComment.save();

    // Step 2: Add the comment's ID to the post's comments array
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $push: { comments: savedComment._id } }, // Push the comment ID into the comments array
      { new: true } // Return the updated document
    ).populate({
      path: "comments",
      populate: { path: "author", select: "name" }, // Populate author in comments
    }); // Optional: Populate comments with their full data

    console.log("updatedPost: ", updatedPost);
    res.status(200).json(updatedPost.comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.userId;
    const { commentId } = req.body;
    console.log("commentId: ", commentId);

    // Step 1: Validate IDs

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).send("Post Id not found");
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(404).send("Comment ID not found");
    }

    // Step 2: Delete the comment from the Comment collection
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).send("Comment not found");
    }

    // Step 3: Remove the comment ID from the post's comments array
    await PostMessage.findByIdAndUpdate(
      postId,
      { $pull: { comments: commentId } } // Use $pull to remove the comment ID from the comments array
    );

    res.status(200).json({ message: "Comment deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
