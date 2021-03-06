var express = require('express');
var router = express.Router();

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

router.post("/createAccount", (req, res) => {
  ssh2.createAccount(req.body);
  res.send("end");
})
router.post("/queryAccount", (req, res) => {
  ssh2.queryAccount(req.body);
  res.send("end");
})
router.post("/transfer", (req, res) => {
  ssh2.transfer(req.body);
  res.send("end");
})

router.post('/createLoan', async (req, res)=>{
  const result = await ssh2.transfer(req.body);
  res.send(result);
})

router.post('/queryLoan', async (req, res)=>{
  const result = await ssh2.transfer(req.body);
  res.send(result);
})

module.exports = router;
