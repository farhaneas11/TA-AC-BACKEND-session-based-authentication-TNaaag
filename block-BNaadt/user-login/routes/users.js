var express = require('express');
var router = express.Router();
var User = require('../models/user')

//render register page to enter the username and password
router.get('/register',(req,res) => {
  res.render('register');
});

//used for posting the data into the database
router.post('/register',(req,res,next)=>{
User.create(req.body,(err,user) =>{
  console.log(err,user);
  if(err) next(err);
  res.redirect('/user/login')
})
});

//login page
router.get('/login',(req,res,next)=>{
  var error = req.flash('error')[0];  
  res.render('login',{error});
})

//successful Login
router.get('/',(req,res)=>{
  res.render('success');
})

//login handler
router.post('/login',(req,res,next)=>{
  //var id = req.params.id;
  var {email,password} = req.body;
  if(!email || !password){
    req.flash('error','Email/Password required');
    res.redirect('/user/login');
  }
  User.findOne({email},(err,user) =>{
    if(err) next(err);
    //no user
    if(!user){
      return res.redirect('/user/login');
    }
    //compare password
    user.verifyPassword(password,(err,result)=>{
      if(err) next(err);
      if(!result){
        res.redirect('/user/login');
      }
      //persist logged in user
      req.session.userId = user.id;
      res.redirect('/user');
    })
  })
})

//logout
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/user/login');
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.send('respond with a resource');
});

module.exports = router;
