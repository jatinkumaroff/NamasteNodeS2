const express=require('express')
const app = express()
const connectDB = require('./config/database') //runs the db file  where db connects and then sever runs
const userModel= require('./models/user')
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('sun raha hu')
})

// ALWAYS ALWAYS ALWAYS USE ASYNC-AWAIT
app.post('/signup',  async (req,res)=>{
    const {firstName, lastName} = req.body;

    const user= new userModel({ firstName, lastName }); // created instance of usermodel , with given data
    
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





