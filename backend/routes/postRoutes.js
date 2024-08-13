const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');
// const reviewRouter = require("./../routes/reviewRoutes");
const Post = require('../models/postModal');

const router = express.Router();

// router.use("/:postId/reviews", reviewRouter);
router.get('/getposts', postController.getposts);

router.route('/:slug').get(
  postController.incrementPostViews,
  postController.getPostBySlug);

router.route('/category/:category').get(postController.getPostsByCategory);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    postController.uploadPostPhoto,
    postController.resizePostPhoto,
    postController.createPost
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    postController.uploadPostPhoto,
    postController.resizePostPhoto,
    postController.updatePost
  )
  .delete(postController.deletePost);
module.exports = router;
