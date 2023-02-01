const asyncHandler = require("express-async-handler");
const Posts = require("../models/postModel");
const cloudinary = require("../middleware/cloudinary");

const getFeed = asyncHandler(async (req, res) => {
  try {
    const posts = await Posts.find().sort({ createdAt: "desc" }).lean();
    res.send({ posts: posts });
  } catch (err) {
    res.send({ error: err });
  }
});
const getPost = asyncHandler(async (req, res) => {

  try {
    const post = await Posts.findById(req.params.id);
    res.send({ post: post, user: req.user });
  } catch (err) {
    res.send({ error: err });
  }
});
const createPost = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.file);
    await Posts.create({
      title: req.body.title,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      caption: req.body.caption,
      likes: 0,
      user: req.body.user.username,
    });
    console.log("Post has been added!");
    res.redirect("/feed");
  } catch (err) {
    res.status(400);
    console.log(err);
  }
});

module.exports = { createPost, getFeed, getPost };
