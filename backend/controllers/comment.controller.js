const { CommentModel } = require("../model/comment.model");

exports.getAll = async (req, res) => {
  try {
    let data = await CommentModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong." });
  }
};

exports.getOne = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await CommentModel.find({ _id: id });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ msg: "Something Went Wrong" });
  }
};

exports.post = async (req, res) => {
  try {
    let data = req.body;
    let post = new CommentModel(data);
    await post.save();
    res.status(201).send({ msg: "Comment added" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", err });
  }
};

exports.patch = async (req, res) => {
  let id = req.params.id;
  try {
    let data = req.body;
    await CommentModel.findByIdAndUpdate({ _id: id }, data);
    res.status(201).send({ msg: "Comment Updated" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", err });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  try {
    await CommentModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Data Deleted" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", err });
  }
};
