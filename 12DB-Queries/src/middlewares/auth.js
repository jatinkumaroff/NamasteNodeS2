const express=require('express')
const app=express();
app.use(express.json())
const jwt=require('jsonwebtoken');
const userModel=require('../models/user')

const userAuth= async (req,res,next)=>{
    try{
     
        //reads token from req.cookeis => validates it => find user in database
    const {token}=req.cookies;
   
    if(!token){
        throw new Error("token not found")
    }
    const decodedObj = await jwt.verify(token,"shhhh");
    
    
    const {_id}=decodedObj;
    const user=await userModel.findById(_id);
    if(!user){
        throw new Error("user not found")
    }

    req.user=user;
    console.log("attached the user with the req")

    next();/// USE OF NEXT:::: ROUTE GOES ITNO THIS FIRST AND IF EVERYTHING FINE, IT LETS IT PASS THROUGH
    //IF ANY ERROR IS ENCOUNTERED, IT STOPS THERE ONLY
}
    catch(err){
        res.status(400).send("ERROR IS:" + err.message);
    }
}

module.exports= userAuth