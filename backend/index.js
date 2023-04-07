const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connection } = require("./config/db");
const { authRouter } = require("./routes/auth.routes");
const { commentRouter } = require("./routes/comment.routes");
const { authenticate } = require("./middlewares/authenticate.middleware");

const app = express();

app.use(express.json());
app.use(
  cors({
    "origin": "*",
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);
// app.use(authenticate);
app.use("/post", commentRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to DB.");
  } catch (err) {
    console.log("Something went wrong while connecting to DB.", err);
  }
  console.log("Server is running port: ", process.env.port);
});
