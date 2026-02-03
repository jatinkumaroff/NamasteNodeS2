const expess= require('express');
const userRouter=express.Router();
const userAuth =require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest")

//get all pending connection requests for logged in user
userRouter.get('/user/requests/received',userAuth, async (req,res)=>{
    try{
        const loggedInUser= req.user;

        const connectionRequests= await ConnectionRequest.find({
            toUserId:loggedInUser._id,                  //user's recevied requests, not the sent
            status:"interested"                         //pendning. 
        }).populate("fromUserId",["firstName","lastName"]);



    }catch(err){
        res.status(400).json({error: err.message});
    }
})

module.exports = userRouter;