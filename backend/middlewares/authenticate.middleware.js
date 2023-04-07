const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded_token = jwt.verify(token, "secret");
    try {
      if (decoded_token) {
        const userId = decoded_token.userId;
        req.body.user.id = userId;
        next();
      } else {
        res.status(401).send({ msg: "Please Login First" });
      }
    } catch (err) {
      res.status(401).send({ msg: "Invalid Token. Please login.", err });
    }
  } else {
    res.status(401).send({ msg: "Invalid token. Please Login." });
  }
};

module.exports = { authenticate };
