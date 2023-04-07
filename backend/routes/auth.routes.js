const express = require("express");
const { AuthModel } = require("../model/auth.model");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const authController = require("../controllers/auth.controller");

authRouter.post("/register", authController.signup);

authRouter.post("/login", authController.login);

authRouter.get("/", authController.get);

authRouter.delete("/:id", authController.delete);

module.exports = { authRouter };
