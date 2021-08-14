var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,minlength:5,required:true},
    userId:[{type:Schema.Types.ObjectId,ref:"Article"}]
},{timestamps:true});

//To get the Fullname
userSchema.virtual('fullName').
  get(function() { return `${this.firstName} ${this.lastName}`; }).
  set(function(v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
});

userSchema.pre('save', function (next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hashed)=>{
            if(err) return next(err);
            this.password = hashed;
                return next();
        })
    }else{
        next();
    }
});

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result);
    })
};

var User = mongoose.model('User', userSchema);
module.exports = User;