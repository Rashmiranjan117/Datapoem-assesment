const express = require("express");
const { CommentModel } = require("../model/comment.model");

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
  try {
    let data = await CommentModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong." });
  }
});

commentRouter.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await CommentModel.find({ _id: id });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ msg: "Something Went Wrong" });
  }
});

commentRouter.post("/", async (req, res) => {
  try {
    let data = req.body;
    let post = new CommentModel(data);
    await post.save();
    res.status(201).send({ msg: "Comment added" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", err });
  }
});

commentRouter.patch("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = req.body;
    await CommentModel.findByIdAndUpdate({ _id: id }, data);
    res.status(201).send({ msg: "Comment Updated" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", err });
  }
});

commentRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await CommentModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Data Deleted" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", err });
  }
});


module.exports = { commentRouter };
