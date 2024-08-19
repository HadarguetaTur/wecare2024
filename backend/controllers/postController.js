const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { uploadSingle, processImage } = require('../utils/uploadImage');
const Post = require('./../models/postModal');

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('./handlerFactory');

exports.uploadPostPhoto = uploadSingle;

exports.resizePostPhoto = processImage;

exports.getAllPosts = getAll(Post);
exports.getPost = getOne(Post, { path: 'reviews' });
exports.createPost = createOne(Post);

exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);

exports.incrementPostViews = async (req, res, next) => {
  const slug = decodeURIComponent(req.params.slug);
  try {
    await Post.findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } }
    );
    next()
  } catch (error) {
    console.error('Error incrementing post views:', error);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  const slug = decodeURIComponent(req.params.slug);
  let query = Post.findOne({ slug: slug });
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
};

exports.getPostsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    console.log(category);

    const posts = await Post.find({ category: category });

    console.log(posts);

    if (!posts || posts.length === 0) {
      return next(new AppError('No posts found in this category', 404));
    }

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (error) {
    next(error);
  }
};


exports.getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });


    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};
