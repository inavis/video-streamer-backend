const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
        .then(()=>console.log('DB connected'))
        .catch(err=>console.log(err));

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(process.env.PORT);