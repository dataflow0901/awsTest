var express = require('express');
var router = express.Router();

const exec = require("../util/ssh");
const ssh2 = require('../util/ssh2');

  /* GET home page. */
router.get('/', function(req, res, next) {
    
    exec.ls();
    // exec.createAccount(req.query);

    res.send("hi");
});

router.get("/ubuntu", (req, res) => {
  ssh2.initUbuntu();

  res.send("end");
})

router.get("/aws", (req, res) => {
  ssh2.initAws();
  res.send("end");
})

module.exports = router;
