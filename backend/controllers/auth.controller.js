const bcrypt = require("bcrypt");
const { AuthModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let { email, password } = req.body;
  let temp = await AuthModel.find({ email });
  if (temp.length > 0) {
    res.status(401).send({
      msg: "User exists with this email! Use a different ID/ try logging in",
    });
  } else {
    try {
      bcrypt.hash(password, 6, async (err, secured_password) => {
        if (err) {
          console.loq(err);
        } else {
          const user = new AuthModel({
            email,
            password: secured_password,
          });
          await user.save();
          res.status(201).send({ msg: "Account created successfully" });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Something went wrong", err });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthModel.find({ email });
  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email, password, userId: user[0]._id },
          "masai"
        );
        res.status(202).send({ msg: "Logg in Successfull", token });
      } else {
        res.status(401).send({ msg: "Wrong Credentialls", err });
      }
    });
  } else {
    res.status(404).send({ msg: "User Not Found. Register First" });
  }
};

exports.get = async (req, res) => {
  let data = await AuthModel.find();
  res.status(200).send(data);
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  await AuthModel.findByIdAndDelete({ _id: id });
  res.status(200).send("Deleted");
};
