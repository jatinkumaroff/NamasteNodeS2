const express=require('express')
const profileRouter = express.Router()
const userAuth=require('../middlewares/auth')
const jwt=require('jsonwebtoken')
const userModel=require('../models/user')

profileRouter.get('/profile', userAuth ,async (req,res)=>{        //added middlewre for user authentication
   try { //fetching the cookie for authentication:
    const cookies=req.cookies   //to read cookie, we need middleware : cookie-parser
    //extract the "token" from cookies and auhtenticate that
    const{token}=cookies;
    if(!token){
        throw new Error("Invalid Token");
    }
    
    //verification:
    const decoded = await jwt.verify(token,"shhhh") //(token to be verified), secretKey
    console.log(decoded)
    const {_id}=decoded
    const user= await userModel.findById(_id);
    if(!user){
        throw new Error("user not present, create account")
    }

    res.send(user)}
    catch(err){
        res.status(400).send("ERROR"+ err.message);
    }
})


module.exports = profileRouter