var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');

var articleSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},    
    likes:{type:Number,default:0},
    slug:{type:String,unique:true},
    articleId:[{type:Schema.Types.ObjectId,ref:"Comment",ref:"User"}]
},{timestamps:true});



var Article = mongoose.model('Article',articleSchema);
module.exports = Article;