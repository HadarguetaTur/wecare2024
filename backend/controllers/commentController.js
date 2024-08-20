const Comment = require('./../models/commentModel'); // ודא שהמודל קיים
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('./handlerFactory');

// פונקציה עזר למציאת תגובה לפי ID
const findCommentById = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new AppError('No comment found with that ID', 404);
  }
  return comment;
};

// יצירת תגובה חדשה
exports.createComment = createOne(Comment);

// קבלת תגובה לפי ID
exports.getComment = getOne(Comment);

// עדכון תגובה לפי ID
exports.updateComment = updateOne(Comment);

// מחיקת תגובה לפי ID
exports.deleteComment = deleteOne(Comment);

// הוספת דירוג לתגובה
exports.addRatingToComment = catchAsync(async (req, res, next) => {
  const { commentId, rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return next(new AppError('Rating must be between 1 and 5', 400));
  }

  const comment = await findCommentById(commentId);
  comment.rating = rating;
  await comment.save();

  res.status(200).json({
    status: 'success',
    data: { comment }
  });
});




exports.getCommentsForPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    return next(new AppError('Post ID is required', 400));
  }

  const comments = await Comment.find({ post: postId, parentCommentId: { $exists: false } })
  .populate({ path: 'userId', select: 'username photo' })
  .sort({ createdAt: -1 });

    console.log(comments);
  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: { comments }
  });
});

exports.createReply = catchAsync(async (req, res, next) => {
  const { post, parentComment, comment ,user,rating=null} = req.body;

  if (!post || !parentComment|| !comment) {
    return next(new AppError('Post ID, parent comment ID, and comment are required', 400));
  }

  const newComment = await Comment.create({
    post,
    parentComment,
    comment,
    rating,
    user: user,
  });

  res.status(201).json({
    status: 'success',
    data: { comment: newComment },
  });
});

exports.likeComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const comment = await Comment.findById(id);
  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  if (comment.likes.includes(userId)) {
    return next(new AppError('You have already liked this comment', 400));
  }

  comment.likes.push(userId);
  await comment.save();

  res.status(200).json({
    status: 'success',
    data: { comment },
  });
});

exports.dislikeComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const comment = await Comment.findById(id);
  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  if (comment.dislikes.includes(userId)) {
    return next(new AppError('You have already disliked this comment', 400));
  }

  comment.dislikes.push(userId);
  await comment.save();

  res.status(200).json({
    status: 'success',
    data: { comment },
  });
});