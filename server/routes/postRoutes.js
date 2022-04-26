const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const auth = require("../middleware/auth");

router.get("/", postController.getPosts);

router.post("/", auth, postController.createPost);

// router.get("/:id", postController.getPost);

router.patch("/:id", auth, postController.updatePost);

router.delete("/:id", auth, postController.deletePost);

router.patch("/:id/likePost", auth, postController.likePost);

module.exports = router;
