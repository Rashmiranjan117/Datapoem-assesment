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
      createdAt: { type: String, default: Date.now() },
      score: { type: Number, default: 0 },
      replyingTo: String,
      user: {
        image: String,
        id: String,
        name: String,
      },
    },
  ],
});

commentSchema.default({ replies: [] });

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = { CommentModel };
