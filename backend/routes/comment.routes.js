const express = require("express");
const { CommentModel } = require("../model/comment.model");

const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller");

commentRouter.get("/", commentController.getAll);

commentRouter.get("/:id", commentController.getOne);

commentRouter.post("/", commentController.post);

commentRouter.patch("/:id", commentController.patch);

commentRouter.delete("/:id", commentController.delete);

module.exports = { commentRouter };
