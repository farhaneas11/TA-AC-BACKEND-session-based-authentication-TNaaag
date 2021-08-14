var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Article = require('../models/article');
var User = require('../models/user');

//Get the Article Index
router.get('/',(req, res,next) => {
    Article.find({},(err, articles)=>{
        if(err) return next(err);
        res.render('articleindex',{articles})
    })
});

//Create Article-form
router.get('/new',(req, res,next) => {
    res.render('newarticle')
});

//Post the Articles from new-Article
router.post('/',(req, res, next) =>{
    Article.create(req.body,(err,createarticle)=>{
        if(err) return next(err);
        res.redirect('/articles')
    })
});

//List Single Article Details
router.get('/:id',(req, res, next) => {
    var id = req.params.id;
    Article.findById(id,(err,articles)=>{
        if(err) return next(err)
        res.render('singleArticle',{articles})
    })
});

//Delete Article
router.get('/:id/delete',(req, res, next) => {
    var id = req.params.id;
    Article.findByIdAndDelete(id,(err,articles)=>{
        if(err) return next(err)
        res.redirect('/articles')
    })
})

//like-Butoon
router.get('/:id/likes',(req,res,next)=>{
    var id = req.params.id;
    Article.findByIdAndUpdate(id,{$inc:{likes : 1}},(err,articles)=>{
        if(err) return next(err)
        res.redirect('articles/' + id)
    })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
  
module.exports = router;