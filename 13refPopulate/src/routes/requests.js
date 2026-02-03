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

requestsRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
    console.log("aa gaya review route mein toh")
    try{
        const  {requestId,status}=req.params;
    const loggedInUser = req.user;  //received from userAuth
    console.log("ye banda logged in hai:" + loggedInUser.firstName)
    const allowedStatus=["accepted","rejected"];
        //validate status
    if(!allowedStatus.includes(status)){
        throw new Error("status thik daal. accepted ya rejected")
    }
    //instead of finding by id, using all three checks do all our validation task, if anything goes wrong, connectionRequest = null
    const connectionRequest= await ConnectionRequestModel.findOne({
        _id: requestId,                         // unique, matches with id
        toUserId:loggedInUser._id,              // checks if toUser is correct
        status:"interested"                     // automatically drops the ignores and takes only if request is of "interested"
    });
    console.log("request bhi mil gyi db mein")
    if(!connectionRequest){
        return res.status(404).json({message:"request nahi hai matching inse"});
    }

    //agar mil jati hai, we'll move to:
    connectionRequest.status = status; //=>if accepted or rejected

    
    const data = await connectionRequest.save();
    //above save line is breaking code, it somehow calls again userAuth and next is not defined it says
    return  res.json({message: "connection request "+ status, data});

    }catch(err){
        res.status(400).json({error: err.message});
    }
});
module.exports = requestsRouter