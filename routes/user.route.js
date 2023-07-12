const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.route("/:email").get(userController.getUserByEmail);


module.exports = router;
