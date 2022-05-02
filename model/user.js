const mongoose = require("mongoose");

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

const User = mongoose.model('User',userSchema);

module.exports({User})