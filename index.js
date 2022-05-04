const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const usersRouter = require('./routes/user')

const  app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
        .then(()=>console.log('DB connected'))
        .catch(err=>console.log(err));

// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());
// app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/user',usersRouter)

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,()=>console.log("app started in  port "+PORT));

