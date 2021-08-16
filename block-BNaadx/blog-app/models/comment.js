var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment:[String],
    author:{type:String},
    commentId:[{type:Schema.Types.ObjectId,ref:"Article"}]
},{timestamps:true})

var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;