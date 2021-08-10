var express = require('express');
var router = express.Router();
var User = require('../models/user')

//render login page to enter the username and password
router.get('/register',(req,res) => {
  res.render('loginpage');
});

//used for posting the data into the database
router.post('/register',(req,res,next)=>{
User.create(req.body,(err,user) =>{
  console.log(err,user);
  if(err) next(err);
  res.redirect('/users/login')
})
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
