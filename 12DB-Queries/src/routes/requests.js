const express= require('express')
const requestsRouter =express.Router()
const userAuth= require('../middlewares/auth')
const ConnectionRequestModel=require('../models/connectionRequest')
const userModel = require('../models/user')
requestsRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res)=>{
    //got to userID from api and fromUserId is person logged in already
    try{
        console.log(req.user);
        const fromUserId= req.user._id //we attached user in userAuth to request
        const toUserId= req.params.toUserId;
        const status=req.params.status;
        // if(fromUserId==toUserId){
        //     return res.status(400).json({
        //         message: "from and to cant be same",
        //     }) 
        // }
        const isUserPresent=await userModel.findById(toUserId);
        if(!isUserPresent){
            return res.status(400).json({
                message: "invalid user id where request is being sent",
            })
        }

        //we only allow these two to be sent:
        const allowedStatus =["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status type" + status,
            })
        }

        //checking if the connection request is alreayd there (u1->u2 // u1<-u2)

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or:[
                {toUserId,fromUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        //if its there, dont allow duplicate request and throw error
        // if(existingConnectionRequest){                                      //API LEVEL VALIDATION
        //     throw new Error("connection already present")
        // }
//now for a present request, neither U1,U2 can send same request twice

//  now we got info about request, create its instance and save it

        const connectionRequest= new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });

        const data= await connectionRequest.save()

        res.json({
            message:"CONNECTION REQUEST SENT SUCCESFULLY",
            data,
        })





    }catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }


    res.send(user.firstName  + "sent the connection request")
});

module.exports = requestsRouter