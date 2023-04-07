const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token)
  if (token) {
    const decoded_token = jwt.verify(token, "secret");
    console.log(decoded_token)
    try {
      if (decoded_token) {
        const userId = decoded_token.userId;
        req.body.user.id = userId;
        req.body.user.name = decoded_token.email;
        console.log(decoded_token);
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
