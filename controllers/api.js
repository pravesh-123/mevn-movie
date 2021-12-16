const Post = require("../models/posts");
const fs = require("fs");

// Get All Post
exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Post By Id
exports.getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a Post
exports.createPost = async (req, res) => {
  const post = req.body;
  const imagename = req.file.filename;
  post.image = imagename;
  try {
    await Post.create(post);
    res.status(201).json({ message: "Movie created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  const id = req.params.id;
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./uoloads/" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.old_image;
  }
  const newPost = req.body;
  newPost.image = new_image;
  try {
    await Post.findByIdAndUpdate(id, newPost);
    res.status(200).json({ message: "Movie updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Post.findByIdAndDelete(id);
    if (result.image != "") {
      try {
        fs.unlinkSync("./uploads/" + result.image);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
