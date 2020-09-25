var express = require('express');
var router = express.Router();

const exec = require("../util/ssh");

  /* GET home page. */
router.get('/', function(req, res, next) {
    
    exec.ls();
    // exec.createAccount(req.query);

    res.send("hi");
});

module.exports = router;
