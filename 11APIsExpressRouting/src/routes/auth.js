const express = require('express')
const authRouter= express.Router()
const {validateSignUpData} = require('../utils/validation.js')
const bcrypt=require('bcrypt')
const userModel=require('../models/user.js')
const validator=require('validator')
authRouter.post('/login', async (req,res)=>{
    try{
        const {emailId, password}=req.body
        validator.isEmail(emailId)         
        const user= await userModel.findOne({emailId})
        console.log(user);
        if(!user){
            throw new Error("email not registered")
        }
       const isPaasswordValid= await bcrypt.compare(password,user.password)         
       
       

       if(isPaasswordValid){
            //JWT Token create
            // const token=await jwt.sign({_id:user._id}, "shhhh") //date , private key
            //instead of creating it, use the one in userModel like:
            const token=await user.getJWT();   //OFFLOADED TO SCHEMA

            //Add token to Cookie and send as response
            res.cookie("token",token)     //cookie: name-value pair

            res.send("user Login Succesfull")
        }else{
            res.send("galat")
        }

    }catch(err){
        res.send(err.message)
    }
})


authRouter.post('/signup',  async (req,res)=>{
    const {password,firstName,lastName,emailId}=req.body
    try{ 
        //Validation of data:
        validateSignUpData(req)        //throws error when encountered
        
        //Password Encryption:
        const passwordHash = await bcrypt.hash(password,10)        //args: (text password, saltRounds ,  )

        //creating new instance of user
        const user= new userModel({
            firstName,lastName,emailId,
            password:passwordHash
        }); 

        //saving an instance of a model is saving it to the database
        await user.save()   
       
        res.send(user)
    }catch(err){
        res.send(err.message)
    }
    
})

authRouter.post('/logout', (req,res)=>{
    //set token to null and expire it immediately
    res.cookie("token",null,{
        expires:new Date(Date.now())
    }).send("logout succedfull")

    //.sent at last is called chaining: res.cookie(some stuff).send(some stuff)
})
module.exports=authRouter