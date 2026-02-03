const mongoose=require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId, required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId, required:true
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

connectionRequestSchema.pre("save",function(next){
    const connectionRequestSchema=this;  //THIS IS REALLY IMPORTANT , IT WILL let us access the data of current user
    //ELSE WE WILL BE USING JUST SCHEMA , NOT THE PARTICULAR INSTANCE OF IT!!!


    if(connectionRequestSchema.fromUserId.equals(connectionRequestSchema.toUserId)){
        throw new Error("khud ko kyu bhej rha h bsdk")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel",connectionRequestSchema)
module.exports=ConnectionRequestModel