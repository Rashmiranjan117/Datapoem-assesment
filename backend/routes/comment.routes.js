const express = require("express");
const { CommentModel } = require("../model/comment.model");
const {authenticate} = require('../middlewares/authenticate.middleware')
const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller");

commentRouter.get("/",commentController.getAll);

commentRouter.get("/:id", authenticate,commentController.getOne);

commentRouter.post("/",authenticate, commentController.post);

commentRouter.patch("/:id", authenticate,commentController.patch);

commentRouter.delete("/:id", authenticate,commentController.delete);

module.exports = { commentRouter };
