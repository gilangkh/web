/** @format */

var express = require("express");
var router = express.Router();
const {createUser, findUser, getUsers} = require('../controllers/UserControllers')

/* GET home page. */
router.get("/",  (req, res, next)=> {
  res.render("index");
});

router.post("/create",createUser)
router.get("/oneUser", findUser)
router.get("/users", getUsers,(req,res,next)=>{
  res.sendFile('user.html')
})

module.exports = router;
