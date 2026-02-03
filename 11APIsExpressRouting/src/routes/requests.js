const express= require('express')
const requestsRouter =express.Router()

requestsRouter.post("/sendConnectionRequest", async (requestsRouter,res)=>{
    const user=req.user
    //Sending a connection request
    console.log("Sending a connection request")
    res.send(user.firstName  + "sent the connection request")
});

module.exports = requestsRouter