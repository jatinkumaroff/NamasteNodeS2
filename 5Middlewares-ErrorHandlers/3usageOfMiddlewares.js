const express = require("express");
const app = express();


//3
//Best way: write whole auth logic in some other file and use that directly
const adminAuth=require('./middlewares/adminAuth')
app.use('/admin',adminAuth);    //SIMPLEST AUTHENTICATION TECHNIQUE TO USE DIFFERENT FILES

// 4
// Other way of writing it:
app.use('/user',userAuth, (req,res)=>{        //FIRSTLY FLOW FOES TO MIDDLEWARE AND THEN PROGRESS 
    res.send("bla bla bla");
    })

app.get('/admin/getData',(req,res)=>{
res.send("all data")
})
app.get('/admin/deleteData',(req,res)=>{
res.send("deleted data")
})

//1
// In above functions, we need to Authenticate first then run these APIs
//So here middlewares come into play, the following is an example of authentication first::
// Instead of writing AUTHENTICATION LOGIC again and again for every call, create function and use it as MIDDLEWARE


//2
// creating MIDDLEWARE for all requests coming to /admin:
//this thing is meant to be written at the very top only:

app.use('/admin',(req,res,next)=>{
    const tokenReceived="xyz" //assuming it. we'll get it from user
    const isAuthorised= tokenReceived == "xyz"
    if(!isAuthorised){
      return  res.status(401).send("Unauthorised")
    }else{
        next();
    }    
})


app.listen(3000);