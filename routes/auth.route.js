const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);

module.exports = router;
