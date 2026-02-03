const mongoose=require('mongoose')

//schema
const userSchema=new mongoose.Schema({
    firstName: {
        type:String,
    },
    lastName: {
        type:String
    },
    emailId: {
        type:String,
    },
    password: {
        type:String
    },
    age: {
        type:String
    },
    gender:{
        type:String,
    }

})



/*model
first arg: model name, second arg: schema from which model is created*/
module.exports= mongoose.model("User",userSchema);




/*
two methods:::   1) User.create -> same older way
                 2) Using save() - create instance , then call save()
                    const userobj = new User({
                        data : fill it
                     })
                    userobj.save();
*/
