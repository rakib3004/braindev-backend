const express = require("express");
const router = express.Router();

router.route("/").get((req,res)=>{
res.send({"message":"Test API is working successfully"});
});
router.route("/first").get((req,res)=>{
    res.send({"message":"Test API 1 is working successfully"});
});
    router.route("/second").get((req,res)=>{
        res.send({"message":"Test API 2 is working successfully"});
    });

module.exports = router;
