const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.route("/:email").post(userController.getUserByEmail);

module.exports = router;
