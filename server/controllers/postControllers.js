const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Post.countDocuments({});
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res, next) => {
  const { title, message, selectedFile, tags, creator } = req.body;
  const newPost = new Post({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// exports.getPost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

exports.updatePost = async (req, res, next) => {
  const { title, message, creator, selectedFile, tags } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, message, creator, selectedFile, tags },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Post Deleted Successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.status(202).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
