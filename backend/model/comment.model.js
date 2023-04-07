const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: String,
  createdAt: { type: String, default: Date.now() },
  score: { type: Number, default: 0 },
  user: {
    image: String,
    id: String,
    name: String,
  },
  replies: [
    {
      id: String,
      content: String,
      createdAt: { type: String, default: new Date() },
      score: { type: Number, default: 0 },
      replyingTo: String,
      default: [],      
    },
  ],
});

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = { CommentModel };
