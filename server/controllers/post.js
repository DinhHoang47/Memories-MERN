import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// CONST define

const LIMIT = 8;

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
      .limit(8);
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
    const post = await PostMessage.findById(_id);
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

    const post = await PostMessage.findById(id);
    const { name, _id } = await User.findById(userId);
    const newComment = `${name}:${_id}:${comment}`;
    post.comments.push(newComment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
