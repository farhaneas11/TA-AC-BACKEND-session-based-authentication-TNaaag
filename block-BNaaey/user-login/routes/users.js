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
  res.render('login');
})

//successful Login
router.get('/success',(req,res)=>{
  res.render('success');
})

//login handler
router.post('/login',(req,res,next)=>{
  //var id = req.params.id;
  var {email,password} = req.body;
  if(!email || !password){
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

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  //console.log(req.session)
  //res.render('index');

});
*/
module.exports = router;
