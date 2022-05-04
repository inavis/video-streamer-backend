
const express = require('express')
const {auth} = require('../middleware/auth')


const User = require('../model/user');
const router = express.Router();


router.get("/",auth,(req,res)=>{
    res.send("USER DETAILS")
})

router.post("/register",async(req,res)=>{
    
    //users will be collection in which data is added
    const users =new User(req.body);
    //hashing password
    users.password = await users.genPassword(req.body.password)

    //adding data to collection
    users.save()
    .then(()=>res.status(200).send({message:"User added successfully"}))
    .catch(err=>res.status(400).send({message:"Failed",err}))
})

router.post("/login",async(req,res)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user){
        res.send({message:"No such user"})
    }
    console.log(user)


    //compare passwords
   user.comparePassword(req.body.password, (err,isMatch)=>{
        if(!isMatch){
            res.send({message:"Check your credentials again"})
        }
        console.log(isMatch)
    })

    user.generateToken((err,userDetails)=>{
        if(err){
            res.status(400).send({message:"Some error occured"})
        }
        console.log(userDetails.token)
        res.cookie("x-auth-token",userDetails.token).status(200).send({message:"Login Success"})
    })
})

router.get("/logout",auth,(req,res)=>{
    //in auth we have set req.user,req.token
    console.log(req.user,req.token)
    User.findOneAndUpdate({_id:req.user},{token:""},(err,doc)=>{
        if(err)
            res.status(400).send({message:"Logout Failed"})
        res.status(200).send({message:"Logout Success"})
    })  
})

const usersRouter = router;
module.exports=usersRouter