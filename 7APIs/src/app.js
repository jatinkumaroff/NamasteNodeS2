const express=require('express')
const app = express()
const connectDB = require('./config/database') //runs the db file  where db connects and then sever runs
const userModel= require('./models/user')
app.use(express.json())



//feed-api :get /feed - get all the users from the database
app.get('/feed',async (req,res)=>{
    //using Model.find() => returns an array of all the data found matching the given condition
    try{
        const found = await userModel.find({}) // empty filter => finds all documents
        if(found.length>0){
            res.send(found)
        }else{
            res.send('no users found')
        }
    }catch (err){
        res.status(404).send(err.message)
    }


})

//get user by email/name or any filter: 
app.get('/user',async (req,res)=>{
    try{
        const found = await userModel.find({emailId:req.body.emailId})
        res.send(found)
    }catch(err){
        res.status(400).send(err.message)
    }
})

// :delete /user findByIdAndDelet:
app.delete('/user',async(req,res)=>{
    const userId= req.body.userId
     try{
        const found = await userModel.findByIdAndDelete(userId)
        res.send("user deleted")
    }catch(err){
        res.status(400).send(err.message)
    }
})

//updating user :patch /user =>findByIdAndUpdate
app.patch('/user',async (req,res)=>{
    const userId = req.body.userId
    try{
        const found= await userModel.findByIdAndUpdate(userId, req.body)   //fbiaU(id,updateData,options)
        //above thing returns the object before updation by default. we can give option to change it
        console.log(found)
        res.send('user updated')
    }catch(err){
        res.status(400).send(err.message)
    }
})








app.get('/',(req,res)=>{
    res.send('sun raha hu')
})

app.post('/signup',  async (req,res)=>{

    const user= new userModel(req.body); // created instance of usermodel , with given data
    
    try{ 
        await user.save()   //saving an instance of a model is saving it to the database
        res.send(user)
    }catch(err){
        res.send(err.message)
    }
    
})






//this connection thing returns a promise, so we ddo this on calling it:
//this is try-catch
connectDB().then(()=>{
        console.log('database: DevTinder');
        //once conncted , we start the server
        app.listen(3000, ()=>{
        console.log('server : 3000');
        });
                }).catch((err)=>{
                         console.error('error encountered');
                        console.log(err);
        })





