const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  id: String,
  content: String,
  createdAt: String,
  score: Number,
  user: {
    image: String,
    id: String,
    name: String,
  },
  replies: {
    id: String,
    content: String,
    createdAt: String,
    score: Number,
    replyingTo: String,
    user: {
      image: String,
      id: String,
      name: String,
    },
  },
});

const CommentModel = require("comment", commentSchema);

module.exports = { CommentModel };
