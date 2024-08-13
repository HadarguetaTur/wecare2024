const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username:{
      type: String,
      require:true
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      unique: true,
    },
    photo: {
      type: String,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0, 
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);


module.exports = Post;