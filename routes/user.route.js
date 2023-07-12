const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.route("/:email").get(userController.getUserByEmail);
router.route("/intro").get((req,res)=>{
    res.send("Hi Brain DEV Team");
})

module.exports = router;
