const mongoose=require('mongoose')

const connectionRequestSchema =  mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId, required:true , ref:"user"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId, required:true , ref:"user"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["accepted","rejected","ignore","interested"],
            message:`it is not a valid type`
        }
       
        
        
        
    },

},{timestamps:true})

connectionRequestSchema.pre("save",function(){

    console.log("next wale system me toh ghu gaye bhai : connectionRequest: save-pre function")
    const doc=this;  //THIS IS REALLY IMPORTANT , IT WILL let us access the data of current user

    if(doc.fromUserId.equals(doc.toUserId)){
        throw new Error("khud ko kyu bhej rha h bsdk");
    }
    console.log("next call krne se just pehle")

    console.log("next call krne se just baad")
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel",connectionRequestSchema)
module.exports=ConnectionRequestModel