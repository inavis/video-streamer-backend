const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema =  mongoose.Schema({
    firstname:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:100
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    },
    tokenExpiration:{
        type:Number
    }
})

userSchema.methods.genPassword = async function(password){
    const salt =await bcrypt.genSalt(10);
    const hashedpassword =await bcrypt.hash(password,salt)
    //console.log(password,salt,hashedpassword);
    return hashedpassword
}

userSchema.methods.comparePassword= async function(plainpassword,cb){
    console.log(plainpassword,this.password)
    const isMatch = await bcrypt.compare(plainpassword,this.password)
    return cb(null,isMatch) 
}

userSchema.methods.generateToken = function(cb){
    const user = this;
    const token =  jwt.sign(this._id.toHexString(),process.env.SECRET);

    user.token=token;
    user.save().then(()=>{
        return cb(null,user)
    }).catch((err)=>{return cb(err)})
}

//in DB link we have mentioned myFirstDatabase
//below we have mentioned collection name as video-streamer-app
// const User = mongoose.model('User',userSchema,"users");

const User = mongoose.model('User',userSchema);

 module.exports= User;