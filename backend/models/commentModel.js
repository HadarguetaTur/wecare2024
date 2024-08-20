const mongoose = require('mongoose');
const Post = require('./../models/postModal');
const User = require('./../models/userModel')

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment cannot be empty!']
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: null,
      validate: {
        validator: function(value) {
          return this.parentComment === null ? value !== null : value === null;
        },
        message: 'Rating can only be given to the original comment, not to a reply.'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    parentComment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      default: null 
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    dislikes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// יצירת אינדקס ייחודי עבור פוסט, משתמש ותגובה הורה
commentSchema.index({ post: 1, user: 1, parentComment: 1 }, { unique: true });

commentSchema.statics.calcAverageRatings = async function(post) {
  const stats = await this.aggregate([
    {
      $match: { post: post, parentComment: null }
    },
    {
      $group: {
        _id: '$post',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(post, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Post.findByIdAndUpdate(post, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

commentSchema.post('save', function() {
  if (this.parentComment == null) {
    this.constructor.calcAverageRatings(this.post);
  }
});



commentSchema.post(/^findOneAnd/, async function() {
  if (this.r && this.r.parentComment == null) {
    await this.r.constructor.calcAverageRatings(this.r.post);
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
